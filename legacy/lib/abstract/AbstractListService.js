import md5 from 'MD5';

export default class {
    constructor($injector) {
        'ngInject';

        this.CacheFactory = $injector.get('CacheFactory');
        this.$log = $injector.get('$log');
        this.config = $injector.get('$WPHCConfig');
        this.$stateParams = $injector.get('$stateParams');
        this.$q = $injector.get('$q');
        this.$injector = $injector;
        this.type = null;
        this.service = null;
    }

    setType(type = null) {
        this.type = type;
    }

    setService(service = null) {
        this.service = service;
    }

    getCache() {
        if (this.CacheFactory.get(this.type)) {
            return this.CacheFactory.get(this.type);
        }
        return this.CacheFactory(this.type, _.set(this.config, `${this.type}.cache`));
    }


    clearCache() {
        this.CacheFactory.destroy(this.type);
    }

    getHttpPromise(query) {
        return this.service.getList(query);
    }

    getCacheUniqueString(query){
        return `${this.config.api.baseUrl}${this.type}${this.$stateParams.term}${query}`;
    }

    get(query) {
        let queryString = JSON.stringify(query);
        let deferred = this.$q.defer();
        let hash = md5(this.getCacheUniqueString(queryString));
        let listCache = this.getCache().get(`list-${hash}`);
        if (listCache) {
            deferred.resolve(listCache);
        } else {
            this.getHttpPromise(query).then((response) => {
                    this.getCache().put(`list-${hash}`, response);
                    deferred.resolve(response);
                })
                .catch((error) => {
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    }
}
