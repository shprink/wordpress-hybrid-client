import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($injector, $wpApiUsers) {
        'ngInject';

        super($injector);
        this.setType('author');
        this.setService($wpApiUsers);
    }
}
