export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.config = $injector.get('$WPHCConfig');
        this.service = $injector.get('$WPHCAuth');
        this.$state = $injector.get('$state');
        this.$ionicHistory = $injector.get('$ionicHistory');
        this.$ionicNavBarDelegate = $injector.get('$ionicNavBarDelegate');

        $scope.$on('$ionicView.enter', () => { this.logout(); });
    }

    logout() {
        this.service.unauth();
        this.$ionicHistory.clearCache().then(() => {
            this.$ionicHistory.clearHistory();
            this.$ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            this.$state.go(this.config.auth.defaultState.state, this.config.auth.defaultState.params);
        });
    }
}
