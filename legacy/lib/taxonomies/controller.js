import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCTaxonomiesCategory, $WPHCTaxonomiesTag, $WPHCTaxonomiesCustom, $injector, $scope, $filter, $stateParams) {
        'ngInject';

        super($injector, $scope);
        this.showToolbar = true;
        this.setType('taxonomies');
        if ($stateParams.term === 'categories') {
            this.setTitle($filter('translate')('categories.title'));
            this.setService($WPHCTaxonomiesCategory);
        } else if ($stateParams.term === 'tags') {
            this.setTitle($filter('translate')('tags.title'));
            this.setService($WPHCTaxonomiesTag);
        } else {
            this.setTitle($stateParams.term);
            this.setService($WPHCTaxonomiesCustom);
        }
        this.term = $stateParams.term;
        this.postType = $stateParams.postType;
    }
}
