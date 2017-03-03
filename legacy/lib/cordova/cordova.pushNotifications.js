module.exports = angular.module('wordpress-hybrid-client.cordova')
    .run(($log, $WPHCConfig, $ionicPlatform, $WPHCPushNotifications) => {
        'ngInject';

        $log.info('[pushNotifications]');

        if (!_.get($WPHCConfig, 'cordova.pushNotifications.enabled')) {
            $log.info('[pushNotifications] disabled');
            return;
        }

        $ionicPlatform.ready(() => {
            $WPHCPushNotifications.init();
            $WPHCPushNotifications.hasPermission().then(() => {
                if ($WPHCPushNotifications.hasBeenUnregistered()) {
                    return;
                }
                $WPHCPushNotifications.register()
            });
        });
    });
