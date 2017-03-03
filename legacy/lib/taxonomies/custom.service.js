import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiTerms, $injector) {
        'ngInject';

        super($injector);
        this.setType(`customPosts/${this.$stateParams.term}`);
        this.setService($wpApiTerms);
    }

    getHttpPromise(query) {
        if (!this.$stateParams.term){
            return this.$q.reject();
        }
        return this.service.getCustomList(this.$stateParams.term, query);
    }
}
