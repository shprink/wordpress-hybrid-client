module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .config ($cordovaAppRateProvider, $WPHCConfig) ->
        if !_.get $WPHCConfig, 'cordova.appRate.enabled'
            return

        document.addEventListener 'deviceready', (->
            preferences = _.get $WPHCConfig, 'cordova.appRate.preferences'

            if _.get $WPHCConfig, 'cordova.appRate.useCustomRateDialog'
                strings = _.get $WPHCConfig, 'cordova.appRate.customLocale'
                strings.title = strings.title.replace(/%@/g, preferences.appName)
                strings.message = strings.message.replace(/%@/g, preferences.appName)
                $cordovaAppRateProvider.setCustomLocale strings

            $cordovaAppRateProvider.setPreferences preferences
            return
        ), false

    .run ($cordovaAppRate, $WPHCConfig, $ionicPlatform) ->
        if !_.get $WPHCConfig, 'cordova.appRate.enabled'
            return
        $ionicPlatform.ready () ->
            $cordovaAppRate.promptForRating(false).then ((result) ->
              console.log 'result: ' + result
              $scope.words = result
              return
            ), (error) ->
              $scope.words = result
              return
            return
        , false
