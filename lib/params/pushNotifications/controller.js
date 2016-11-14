export default function($log, $scope, $WPHCPushNotifications, $WPHCLoading) {
    'ngInject';

    let vm = this;
    vm.onChange = onChange;

    $scope.$on('$ionicView.enter', () => onEnter());

    function onChange(){
        $WPHCLoading.show();
        if (vm.hasBeenRegistered){
            $WPHCPushNotifications.register().finally(() => {
                $WPHCLoading.hide();
            });
        } else {
            $WPHCPushNotifications.unregister().finally(() => {
                $WPHCLoading.hide();
            });
        }
    }

    function onEnter() {
        $WPHCLoading.show();
        $WPHCPushNotifications.hasBeenRegistered().then((response) => {
            vm.hasBeenRegistered = true;
        }, () => {
            vm.hasBeenRegistered = false;
        }).finally(() => {
            $WPHCLoading.hide();
        });
    }
}
