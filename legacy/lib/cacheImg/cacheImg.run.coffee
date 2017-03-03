module.exports = angular.module 'wordpress-hybrid-client.cacheImg'
    .run ($ionicPlatform, $log, $WPHCConfig) ->
        ImgCache.options.debug = if IS_PROD then false else true
        ImgCache.options.chromeQuota = $WPHCConfig.cache.img.chromeQuota;
        ImgCache.options.localCacheFolder = $WPHCConfig.cache.img.localCacheFolder;
        ImgCache.options.useDataURI = $WPHCConfig.cache.img.useDataURI;
        ImgCache.options.usePersistentCache = $WPHCConfig.cache.img.usePersistentCache;
        ImgCache.options.cacheClearSize = $WPHCConfig.cache.img.cacheClearSize;
        ImgCache.options.headers = $WPHCConfig.cache.img.headers;
        ImgCache.options.skipURIencoding = $WPHCConfig.cache.img.skipURIencoding;

        $ionicPlatform.ready ->
            $log.debug 'ImgCache initialising'
            ImgCache.init ->
                $log.debug 'ImgCache init: success!'
            , ->
                $log.error 'ImgCache init: error! Check the log for errors'
