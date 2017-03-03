module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $ionicPlatform, $cordovaGlobalization, $WPHCLanguage) ->
        $log.info 'cordova globalization information'

        $ionicPlatform.ready () ->
            $cordovaGlobalization.getPreferredLanguage()
            .then (locale) ->
                locale = locale.value.substring 0, 2

                if $WPHCLanguage.hasLocale()
                    $WPHCLanguage.setLocale $WPHCLanguage.getLocale()
                else
                    $WPHCLanguage.setLocale locale
