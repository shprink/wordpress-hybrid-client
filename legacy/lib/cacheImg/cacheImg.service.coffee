module.exports = angular.module 'wordpress-hybrid-client.cacheImg'
    .service '$WPHCCacheImg', ($q, $WPHCConfig, $log) ->
        initialised = false
        init: ->
            if initialised
                return
            deferred = $q.defer()
            $log.debug 'ImgCache initialising'
            ImgCache.options.debug = if IS_PROD then false else true
            ImgCache.options.chromeQuota = $WPHCConfig.cache.img.chromeQuota;
            ImgCache.options.localCacheFolder = $WPHCConfig.cache.img.localCacheFolder;
            ImgCache.options.useDataURI = $WPHCConfig.cache.img.useDataURI;
            ImgCache.options.usePersistentCache = $WPHCConfig.cache.img.usePersistentCache;
            ImgCache.options.cacheClearSize = $WPHCConfig.cache.img.cacheClearSize;
            ImgCache.options.headers = $WPHCConfig.cache.img.headers;
            ImgCache.options.skipURIencoding = $WPHCConfig.cache.img.skipURIencoding;
            ImgCache.init ->
                $log.info 'ImgCache init: success!'
                deferred.resolve()
            , ->
                $log.error 'ImgCache init: error! Check the log for errors'
                deferred.reject()
            deferred.promise
        checkCacheStatus: (src) ->
            deferred = $q.defer()
            ImgCache.isCached src, (path, success) ->
                if success
                    deferred.resolve path
                else
                ImgCache.cacheFile src, ->
                    ImgCache.isCached src, (path, success) ->
                        deferred.resolve path
                        return
                    , deferred.reject
                    return
                , deferred.reject
                return
            , deferred.reject
            deferred.promise
