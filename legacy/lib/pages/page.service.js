import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($wpApiPages, $injector) {
        'ngInject';

        super($injector);
        this.setType('page');
        this.setService($wpApiPages);
    }
}
