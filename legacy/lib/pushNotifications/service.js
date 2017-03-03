export default class {
    constructor($injector, $q, $WPHCConfig, $log, $state, $http, $filter, WpApi, $WPHCLanguage) {
        'ngInject';
        this.$q = $q;
        this.WpApi = WpApi;
        this.$log = $log;
        this.$state = $state;
        this.$filter = $filter;
        this.$http = $http;
        this.$WPHCLanguage = $WPHCLanguage;
        this.$WPHCConfig = $WPHCConfig;
        this.token = null;
        this.os = null;
        this.instance = null;
        this.androidConfig = _.get($WPHCConfig, 'cordova.pushNotifications.android');
        this.iosConfig = _.get($WPHCConfig, 'cordova.pushNotifications.ios');

        if (ionic.Platform.isAndroid()) {
            this.os = 'Android';
        } else if (ionic.Platform.isIOS()) {
            this.os = 'iOS';
        } else if (ionic.Platform.isWindowsPhone()) {
            this.os = 'Windows';
        }
    }

    hasBeenUnregistered() {
        let hasBeenUnregistered = localStorage.getItem("pushNotification:unregistered");
        this.$log.debug('[pushNotifications] hasBeenUnregistered', hasBeenUnregistered);
        return hasBeenUnregistered;
    }

    init() {
        if (!ionic.Platform.isWebView()) {
            this.$log.debug('[pushNotifications] cannot init');
        }
        this.$log.debug('[pushNotifications] init');
        this.instance = PushNotification.init({
            android: this.androidConfig,
            ios: this.iosConfig
        });
        if (!ionic.Platform.isWebView()) {
            this.$log.debug('[pushNotifications] cannot init');
        }
    }

    hasPermission() {
        if (!ionic.Platform.isWebView()) {
            return this.$q.reject();
        }
        let deferred = this.$q.defer();
        PushNotification.hasPermission((response) => {
            this.$log.debug('[pushNotifications] hasPermission', response.isEnabled);
            response.isEnabled ? deferred.resolve() : deferred.reject();
        });
        return deferred.promise;
    }

    register() {
        if (!ionic.Platform.isWebView()) {
            this.$log.debug('[pushNotifications] cannot init, no permission or in a browser');
            return this.$q.reject();
        }

        this.instance = PushNotification.init({
            android: this.androidConfig,
            ios: this.iosConfig
        });

        this.$log.debug('[pushNotifications] init', this.androidConfig, this.iosConfig);
        let deferred = this.$q.defer();

        this.instance.on('registration', (data) => {
            this.$log.debug('[pushNotifications] registrationId', data.registrationId);
            this.token = data.registrationId;
            this.registerWebService()
                .then(() => {
                    this.$log.info('[pushNotifications] registered!');
                    localStorage.removeItem("pushNotification:unregistered");
                    deferred.resolve();
                })
                .catch(() => {
                    this.$log.info('[pushNotifications] register failed!');
                    deferred.reject();
                });
        });

        this.instance.on('notification', (data) => {
            this.$log.debug('[pushNotifications] notification data', data);

            if (data.additionalData.foreground) {
                this.confirmNewContent(data.additionalData.id, data.message);
            } else {
                this.openPost(data.additionalData.id);
            }
            if (ionic.Platform.isIOS()) {
                // this.instance.getApplicationIconBadgeNumber((n) => {
                //     this.$log.debug('[pushNotifications] badge iOS count', n)
                //     const newNumber = n + 1;
                //     this.instance.setApplicationIconBadgeNumber(
                //         () => this.$log.debug('[pushNotifications] badge number ok!'),
                //         () => this.$log.debug('[pushNotifications] badge number error!'),
                //         newNumber);
                // }, () => this.$log.debug('[pushNotifications] badge number error!'));
            }
        });

        this.instance.on('error', (error) => {
            this.$log.debug('[pushNotifications] error registering', error);
        });
        return deferred.promise;
    }

    unregister() {
        if (!ionic.Platform.isWebView() || !this.instance) {
            this.$log.debug('[pushNotifications] cannot unregister, you are in the browser or not registered yet...');
            return this.$q.reject();
        }
        this.$log.debug('[pushNotifications] unregistering');
        this.instance.off('registration');
        this.instance.off('notification');
        this.instance.off('error');

        let deferred = this.$q.defer();
        this.unregisterWebService().then(() => {
            return this.instance.unregister();
        }).then(() => {
            this.$log.debug('[pushNotifications] unregistering success');
            localStorage.setItem("pushNotification:unregistered", true);
            deferred.resolve();
        }, () => {
            this.$log.debug('[pushNotifications] unregistering failed');
            deferred.reject();
        });
        return deferred.promise;
    }

    registerWebService() {
        return this.httpPost('/register');
    };

    unregisterWebService() {
        return this.httpPost('/unregister');
    }

    hasBeenRegistered() {
        if (!this.token) {
            return this.$q.reject();
        }
        var baseUrl = _.get(this.$WPHCConfig, 'cordova.pushNotifications.baseUrl');
        if (!baseUrl) {
            return this.$q.reject();
        }
        return this.$http({
            method: 'GET',
            url: baseUrl + '/categories',
            params: {
                os: this.os,
                token: this.token
            }
        }).then(() => {
            this.$log.debug('[pushNotifications] hasBeenRegistered', true);
        }, () => {
            this.$log.debug('[pushNotifications] hasBeenRegistered', false);
            return this.$q.reject();
        });
    }

    httpPost(endpoint = '/register', data = {}) {
        var baseUrl = _.get(this.$WPHCConfig, 'cordova.pushNotifications.baseUrl');
        if (!baseUrl) {
            return this.$q.reject();
        }
        return this.$http({
            method: 'POST',
            url: baseUrl + endpoint,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var p, str;
                str = [];
                for (p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            },
            data: angular.merge({
                os: this.os,
                token: this.token,
                lang: this.$WPHCLanguage.getLocale()
            }, data)
        });
    };

    openPost(postId) {
        let baseUrl = this.WpApi.getBaseUrl()
        this.$http.head(`${baseUrl}/posts/${postId}`, {
            params: {
                os: this.os,
                token: this.token
            }
        }).finally(() => {
            return this.$state.go('public.posts.id', {
                id: postId
            });
        });
    };

    confirmNewContent(postId, postMsg) {
        var buttonNo, buttonYes, text, title;
        title = this.$filter('translate')('pushNotifications.newContent.title');
        text = this.$filter('translate')('pushNotifications.newContent.text', {
            postTitle: postMsg,
            appTitle: _.get(this.$WPHCConfig, 'title' || '')
        });
        buttonYes = this.$filter('translate')('yes');
        buttonNo = this.$filter('translate')('no');
        return navigator.notification.confirm(text, (confirmation) => {
            if (confirmation === 1) {
                return this.openPost(postId);
            }
        }, title, [buttonYes, buttonNo]);
    };
}