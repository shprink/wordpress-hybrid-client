import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($wpApiCustom, $injector) {
        'ngInject';

        super($injector);
        this.setType('customPost');
    }

    getCacheUniqueString(id, query){
        return `${this.config.api.baseUrl}${this.type}${this.$stateParams.slug}${id}${query}`;
    }

    getHttpPromise(id) {
        let service = this.$injector.get('$wpApiCustom').getInstance(this.$stateParams.slug);
        this.setService(service);
        return this.service.get(id);
    }
}
