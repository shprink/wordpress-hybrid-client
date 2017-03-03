module.exports = angular.module 'wordpress-hybrid-client.cordova'
    .config ($cordovaInAppBrowserProvider) ->
        defaultOptions =
            location: 'no',
            clearcache: 'no',
            toolbar: 'no'

        $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions)
