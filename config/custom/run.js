let mod = angular.module('wordpress-hybrid-client.overwriteRun', []);

mod.run(($ionicPlatform, $window, $cordovaStatusbar, $cordovaKeyboard, $ionicHistory) => {
    $ionicPlatform.ready(() => {
        if ($window.cordova && $window.cordova.plugins.Keyboard) {
            $cordovaKeyboard.disableScroll(true);
        }

        // Style light statusbar
        if ($window.StatusBar) {
            $cordovaStatusbar.style(1);
        }
    });
});

export default mod = mod.name;
