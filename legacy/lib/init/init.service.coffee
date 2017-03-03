module.exports = angular.module 'wordpress-hybrid-client.init'
    .service '$WPHCInit', ($q, $WPHCConfig, $log, $WPHCCacheImg) ->
        init: ->
            promises = []
            promises.push $WPHCCacheImg.init()
            $q.all promises
            .then ->
                $log.info 'Init: success!'
