export default function($log, $scope, $WPHCAccessibility, $WPHCLanguage, $WPHCPushNotifications, $WPHCConfig) {
    'ngInject';

    let vm = this;
    vm.fontSize = $WPHCAccessibility.getFontSizeList();
    vm.changeFontSize = changeFontSize;
    vm.changeLanguage = changeLanguage;
    vm.languages = $WPHCLanguage.getLanguagesList();
    vm.selected = {
        fontSize: $WPHCAccessibility.getFontSize(),
        language: $WPHCLanguage.getLocale()
    };
    vm.isPushNotifPermitted = false;
    vm.isPushNotifEnabled = _.get($WPHCConfig, 'cordova.pushNotifications.enabled');

    $scope.$on('$ionicView.enter', () => onEnter());

    function changeFontSize() {
        $log.info('changing fontSize to: ' + vm.selected.fontSize);
        $WPHCAccessibility.setFontSize(vm.selected.fontSize);
    };

    function changeLanguage() {
        $log.info('changing language to: ' + vm.selected.language);
        $WPHCLanguage.setLocale(vm.selected.language);
    };

    function onEnter() {
        $WPHCPushNotifications.hasPermission().then(() => {
            vm.isPushNotifPermitted = true;
        }, () => {
            vm.isPushNotifPermitted = false;
        });
    }
}
