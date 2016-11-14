import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCCompose, $injector, $scope, $templateCache, moment) {
        'ngInject';

        super($injector, $scope);
        this.setType('compose');
        this.setService($WPHCCompose);
        this.$log = $injector.get('$log');
        this.$filter = $injector.get('$filter');
        this.$cordovaCamera = $injector.get('$cordovaCamera');
        this.$cordovaDatePicker = $injector.get('$cordovaDatePicker');
        this.$ionicScrollDelegate = $injector.get('$ionicScrollDelegate');
        this.moment = moment;
        this.slug = _.get(this.$stateParams, 'slug');
        this.setTitle(`compose.${this.slug}.title`);
        this.default = {
            meta: {
                _date: this.moment().format('YYYY-MM-DD')
            }
        };
        
        this.templateUrl = `compose/${this.slug}.html`;

        if (!$templateCache.get(this.templateUrl)) {
            throw new Error(`Template ${this.templateUrl} does not exist`);
        }
    }
    
    init() {
        this.page = 1;
        this.item = angular.copy(this.default);
        this.form.$setPristine();
        return this.$q.resolve();
    }
    
    pickDate() {
        this.$cordovaDatePicker.show().then((date) => {
            this.item.meta._date = this.moment(date).format('YYYY-MM-DD');
        }).catch(() => {
            this.item.meta._date = null;
        });
    }
    
    submit() {
        this.message = null;
        if (this.form.$valid) {
            this.loading = true;
            this.service.submitPost(this.slug, this.item).then((res) => {
                this.$log.debug('Post successfully submitted.');
                this.message = {
                    type: 'energized',
                    content: this.$filter('translate')('compose.form.submitted')
                };
                this.init();
            }).catch((err) => {
                let msg = err ? (err.data && err.data.message) ? err.data.message : err.message : this.$filter('translate')('compose.form.error');
                this.$log.error(msg);
                this.message = {
                    type: 'assertive',
                    content: msg
                };
            }).finally(() => {
                this.loading = false;
                this.$ionicScrollDelegate.scrollTop(true);
            });
        } else {
            this.$ionicScrollDelegate.scrollTop(true);
        }
    }
    
    getPicture(source) {
        this.message = null;
        if (typeof Camera === 'undefined') {
            return;
        }
        let options = {
            quality: 70,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType[source],
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 1024,
            targetHeight: 1024
        };
        this.$cordovaCamera.getPicture(options).then((imageUri) => {
            this.item.featured_media = imageUri;
        }).catch((err) => {
            this.$log.error(err);
            this.item.featured_media = null;
            this.message = {
                type: 'assertive',
                content: err
            };
            this.$ionicScrollDelegate.scrollTop(true);
        });
    }
}