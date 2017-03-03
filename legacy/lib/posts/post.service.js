import md5 from 'MD5';
import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($wpApiPosts, $injector) {
        'ngInject';

        super($injector);
        this.setType('post');
        this.setService($wpApiPosts);
    }

    getFeatureImage(featureImageId) {
        if (!featureImageId || featureImageId === 0) {
            return this.$q.when(null);
        }
        return this.$injector.get('$wpApiMedia').get(featureImageId).then(function(response) {
            return response.data;
        });
    }

    getComments(id) {
        var deferred, hash, itemCache;
        deferred = this.$q.defer();
        hash = md5(this.config.api.baseUrl + id);
        itemCache = this.getCommentsCache().get('item-comments-' + hash);
        this.$log.debug('Post cache', itemCache);
        if (itemCache) {
            deferred.resolve(itemCache);
        } else {
            this.$injector.get('$wpApiComments').getList({
                post: id,
                type: "comment",
                orderby: 'date',
                order: 'asc',
                per_page: _.get(this.config, 'post.comments.per_page') || 50
            }).then(angular.bind(this, (response) => {
                this.getCommentsCache().put('item-comments-' + hash, response.data);
                return deferred.resolve(response.data);
            }))["catch"]((error) => deferred.reject(error));
        }
        return deferred.promise;
    }

    getCommentsCache() {
        if (this.CacheFactory.get('comments')) {
            return this.CacheFactory.get('comments');
        }
        return this.CacheFactory('comments', _.get(this.config, 'post.cache'));
    }
}
