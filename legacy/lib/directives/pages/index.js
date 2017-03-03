export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'pagesCtrl',
        restrict: 'E',
        scope: {
            pages: '='
        },
        template: `
            <div ng-include="'directive/pages.html'"></div>
        `
    };

    function Controller($log, $scope, $WPHCPost) {
        'ngInject';

        var vm = this;
        vm.featureImages = [];

        $scope.$watchCollection('pagesCtrl.pages', function(newValue, oldValue) {
            if (!newValue) {
                return;
            }
            if (newValue.length && newValue[0].better_featured_image){
                _.each(newValue, function(page) {
                    vm.featureImages[page.id] = _.get(page, 'better_featured_image.media_details.sizes.medium.source_url');
                });
            }
            _.each(newValue, function(page) {
                if (vm.featureImages[page.id]) {
                    return;
                }
                $WPHCPost.getFeatureImage(page.featured_media).then(function(image) {
                    if (!image) {
                        return;
                    }
                    return vm.featureImages[page.id] = _.get(image, 'media_details.sizes.medium.source_url');
                });
            });
        });

    }
}
