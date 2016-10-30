import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCCustomPosts, $scope, $injector, $filter) {
        'ngInject';

        super($injector, $scope);
        this.setType('customPosts');
        this.setService($WPHCCustomPosts);
        this.postType = _.get(this.$stateParams, 'slug');
        this.setTitle(this.postType);
    }
}
