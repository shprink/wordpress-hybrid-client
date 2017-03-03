module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .run ($log, $WPHCConfig, $cordovaNetwork, $ionicPlatform) ->
        $log.info 'cordova network information'

        $ionicPlatform.ready () ->
            $log.debug $cordovaNetwork.getNetwork(), 'network information'
