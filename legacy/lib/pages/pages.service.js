import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($injector, $wpApiPages) {
        'ngInject';

        super($injector);
        this.setType('pages');
        this.setService($wpApiPages);
    }
}
