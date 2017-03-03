import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCAuthors, $injector, $scope, $filter) {
        'ngInject';

        super($injector, $scope);
        this.showToolbar = true;
        this.setType('authors');
        this.setTitle($filter('translate')('authors.title'));
        this.setService($WPHCAuthors);
    }
}
