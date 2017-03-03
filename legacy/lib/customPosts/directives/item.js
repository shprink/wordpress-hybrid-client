export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'customPostsItemCtrl',
        restrict: 'E',
        scope: {
            item: '=',
            type: '@'
        },
        template: `
            <div ng-include="customPostsItemCtrl.templateUrl" ng-if="customPostsItemCtrl.type"></div>
        `
    };

    function Controller($scope, $templateCache) {
        'ngInject';

        var vm = this;
        vm.templateUrl = `customPosts/${vm.type}/item.html`;

        if (!$templateCache.get(vm.templateUrl)) {
            throw new Error(`Template ${vm.templateUrl} does not exist`);
        }
    }
}
