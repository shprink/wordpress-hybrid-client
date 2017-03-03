import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($injector, $wpApiUsers) {
        'ngInject';

        super($injector);
        this.setType('authors');
        this.setService($wpApiUsers);
    }
}
