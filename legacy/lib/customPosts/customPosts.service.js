import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiCustom, $injector, $stateParams) {
        'ngInject';

        super($injector);
        this.setType('customPosts');
    }

    getCacheUniqueString(query) {
        return `${this.config.api.baseUrl}${this.type}${this.$stateParams.slug}${query}`;
    }

    getHttpPromise(query) {
        if (!this.$stateParams.slug) {
            return this.$q.reject();
        }
        let service = this.$injector.get('$wpApiCustom').getInstance(this.$stateParams.slug);
        this.setService(service);
        return this.service.getList(query);
    }
}
