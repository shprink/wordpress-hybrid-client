import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiTerms, $injector) {
        'ngInject';

        super($injector);
        this.setType('category');
        this.setService($wpApiTerms);
    }

    getHttpPromise(query) {
        return this.service.getCategoryList(query);
    }
}
