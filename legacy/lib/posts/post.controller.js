import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCPost, $injector, $scope) {
        'ngInject';

        super($injector, $scope);
        this.setType('post');
        this.setService($WPHCPost);
    }
}
