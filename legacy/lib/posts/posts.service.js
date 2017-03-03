import AbstractList from '../abstract/AbstractListService.js';

export default class extends AbstractList {
    constructor($wpApiPosts, $injector) {
        'ngInject';

        super($injector);
        this.setType('posts');
        this.setService($wpApiPosts);
    }
}
