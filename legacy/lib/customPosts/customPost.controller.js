import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCCustomPost, $injector, $scope) {
        'ngInject';

        super($injector, $scope);
        this.setType('customPost');
        // this.setTitle($filter('translate')('customPosts.title'));
        this.setService($WPHCCustomPost);
        this.postType = _.get(this.$stateParams, 'slug');
    }
}
