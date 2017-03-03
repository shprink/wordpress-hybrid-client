import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($injector, $scope, $filter, $WPHCPosts) {
        'ngInject';

        super($injector, $scope);
        this.setType('posts');
        this.setTitle($filter('translate')('posts.title'));
        this.setService($WPHCPosts);
    }
}
