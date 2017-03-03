export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'customPostsListCtrl',
        restrict: 'E',
        scope: {
            list: '=',
            type: '@'
        },
        template: `
            <div ng-include="customPostsListCtrl.templateUrl" ng-if="customPostsListCtrl.type"></div>
        `
    };

    function Controller($scope, $templateCache) {
        'ngInject';

        var vm = this;
        vm.templateUrl = `customPosts/${vm.type}/list.html`;

        if (!$templateCache.get(vm.templateUrl)) {
            throw new Error(`Template ${vm.templateUrl} does not exist`);
        }
    }
}
