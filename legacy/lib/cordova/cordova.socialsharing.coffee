module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .factory '$WPHCSocialSharing', ($log, $WPHCConfig, $ionicPlatform, $cordovaSocialSharing, $cordovaToast, $filter, $window) ->
        $log.info 'cordova socialsharing'

        share: (platform, title, link) ->
            promise = null
            message = title
            switch platform
                when "twitter"
                    promise = $cordovaSocialSharing.shareViaTwitter message, null, link
                when "facebook"
                    promise = $cordovaSocialSharing.shareViaFacebook message, null, link
                when "native"
                    promise = $cordovaSocialSharing.share message, null, null, link

            if promise
                promise.then ->
                    $cordovaToast.showShortBottom($filter('translate') 'sharing.shared') if _.get $window, 'plugins.toast'
                .catch ->
                    $cordovaToast.showShortBottom($filter('translate') 'error') if _.get $window, 'plugins.toast'
