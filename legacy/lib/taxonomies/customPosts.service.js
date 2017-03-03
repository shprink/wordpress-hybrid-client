import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiCustom, $injector, $stateParams) {
        'ngInject';

        super($injector);
        this.setType('customPosts');
    }

    getHttpPromise(query) {
        if (!this.$stateParams.postType){
            return this.$q.reject();
        }
        let service = this.$injector.get('$wpApiCustom').getInstance(this.$stateParams.postType);
        this.setService(service);
        return this.service.getList(query);
    }
}
