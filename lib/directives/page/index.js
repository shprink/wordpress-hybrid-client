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

    function Controller($log, $scope, $WPHCPost, $WPHCConfig, $stateParams) {
        'ngInject';

        var vm = this;
		
		vm.page.footer = _.get($WPHCConfig, 'page.footer');

		vm.page.pageTitle = _.get($stateParams, 'title' );
        if(!vm.page.pageTitle)
			vm.page.pageTitle = vm.page.title.rendered;

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
		$log.debug(vm);
    }
}
