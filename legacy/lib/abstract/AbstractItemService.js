import md5 from 'MD5';
import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($injector) {
        'ngInject';

        super($injector);
    }

    getHttpPromise(id, query) {
        return this.service.get(id, query);
    }

    getCacheUniqueString(id, query){
        return `${this.config.api.baseUrl}${this.type}${this.$stateParams.term}${id}${query}`;
    }

    get(id, query) {
        let queryString = JSON.stringify(query);
        let deferred = this.$q.defer();
        let hash =  md5(this.getCacheUniqueString(id, queryString));
        let itemCache = this.getCache().get(`item-${hash}`);
        if (itemCache) {
            deferred.resolve(itemCache);
        } else {
            this.getHttpPromise(id, query).then((response) => {
                    this.getCache().put(`item-${hash}`, response);
                    deferred.resolve(response);
                })
                .catch((error) => {
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    }
}
