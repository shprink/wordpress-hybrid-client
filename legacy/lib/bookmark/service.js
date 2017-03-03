import md5 from 'MD5';
import moment from 'moment';

export default function($log, $q, $WPHCConfig, CacheFactory, $cordovaToast, $filter, $window) {
    'ngInject';

    return {
        isBookmarked: function(post) {
            var list, test;
            list = getCache().get('list');
            test = _.findWhere(list, {
                id: post.id
            });
            return test != null;
        },
        toggle: function(post) {
            var isBookmarked;
            isBookmarked = this.isBookmarked(post);
            if (isBookmarked) {
                this.remove(post);
            } else {
                this.add(post);
            }
            return !isBookmarked;
        },
        remove: function(post) {
            var list;
            list = getCache().get('list');
            _.remove(list, {
                id: post.id
            });
            getCache().put('list', list);
            if (_.get($window, 'plugins.toast')) {
                return $cordovaToast.showShortBottom($filter('translate')('bookmark.removed'));
            }
        },
        add: function(post) {
            var list;
            post.bookmarked = moment().format();
            list = getCache().get('list') || [];
            list.unshift(post);
            getCache().put('list', list);
            if (_.get($window, 'plugins.toast')) {
                return $cordovaToast.showShortBottom($filter('translate')('bookmark.bookmarked'));
            }
        },
        getList: function() {
            var deferred, listCache;
            deferred = $q.defer();
            listCache = getCache().get('list');
            if (listCache) {
                deferred.resolve(listCache);
            } else {
                deferred.resolve([]);
            }
            return deferred.promise;
        }
    };

    function getCache() {
        var cacheOptions, hash;
        hash = md5($WPHCConfig.api.baseUrl);
        if (CacheFactory.get('bookmark-' + hash)) {
            return CacheFactory.get('bookmark-' + hash);
        }
        cacheOptions = angular.extend(_.get($WPHCConfig, 'bookmark.cache') || {}, {
            maxAge: Number.MAX_VALUE
        });
        return CacheFactory('bookmark-' + hash, cacheOptions);
    }
}
