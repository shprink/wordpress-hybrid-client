export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.loading = $injector.get('$WPHCLoading');
        this.config = $injector.get('$WPHCConfig');
        this.service = $injector.get('$WPHCAuth');
        this.$state = $injector.get('$state');
        this.$log = $injector.get('$log');
        this.$filter = $injector.get('$filter');
        this.$ionicHistory = $injector.get('$ionicHistory');
        this.$ionicNavBarDelegate = $injector.get('$ionicNavBarDelegate');

        $scope.$on('$ionicView.beforeEnter', () => {
            this.validate();
        });
    }
    
    validate() {
        this.service.validate().then((res) => {
            this.$log.debug('User validated from token successfully');
            this.$state.go(this.config.menu.defaultState.state, this.config.menu.defaultState.params);
        }).catch((err) => {
            this.$log.warn('Could not validate user token');
        });
    }

    login() {
        this.form.$setSubmitted(true);
        this.error = null;
        if (this.form.$valid) {
            this.loading.show();
            this.processing = true;
            this.service.auth({
                username: this.service.emailToUsername(this.auth.username),
                password: this.auth.password
            }).then((res) => {
                this.$log.debug('User logged in successfully');
                this.$state.go(this.config.menu.defaultState.state, this.config.menu.defaultState.params);
            }).catch((err) => {
                let msg = err ? err.message : this.$filter('translate')('auth.form.error');
                this.$log.warn(msg);
                this.error = msg;
            }).finally(() => {
                this.loading.hide();
                this.processing = false;
            });
        } else {
            this.error = this.$filter('translate')('auth.form.general');
            angular.forEach(this.form.$error.required, (field) => {
                field.$setDirty();
            });
        }
    }
}
