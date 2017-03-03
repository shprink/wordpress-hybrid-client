module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($rootScope, $log, $WPHCConfig, $cordovaGoogleAnalytics, $ionicPlatform, $location) ->
        $log.info 'cordova analytics'

        if !$WPHCConfig.analytics or !$WPHCConfig.analytics.trackingId
            return

        $ionicPlatform.ready () ->
            $log.info 'cordova analytics ready'
            $cordovaGoogleAnalytics.debugMode() if !IS_PROD
            $cordovaGoogleAnalytics.startTrackerWithId $WPHCConfig.analytics.trackingId

            $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
                $log.debug 'cordova analytics traking page: ', $location.url()
                $cordovaGoogleAnalytics.trackView $location.url()
