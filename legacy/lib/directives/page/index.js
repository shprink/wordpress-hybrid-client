export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'pageCtrl',
        restrict: 'E',
        scope: {
            page: '='
        },
        template: `
            <div ng-include="'directive/page.html'"></div>
        `
    };

    function Controller($log, $scope, $WPHCPost) {
        'ngInject';

        var vm = this;
        vm.featured_image = undefined;
        if (vm.page.better_featured_image) {
            vm.featured_image = _.get(vm.page, 'better_featured_image.media_details.sizes.medium.source_url');
        } else {
            $WPHCPost.getFeatureImage(vm.page.featured_media).then((image) => {
                if (image) {
                    vm.featured_image = _.get(image, 'media_details.sizes.medium.source_url');
                }
            });
        }
    }
}
