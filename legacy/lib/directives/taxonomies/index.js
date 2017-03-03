export default function() {
    return {
        restrict: 'E',
        replace: true,
        bindToController: true,
        controller: Controller,
        controllerAs: 'taxonomiesDirCtrl',
        scope: {
            taxonomies: "=",
            term: '=',
            postType: '=',
            onClick: "&"
        },
        template: `
            <div ng-include="'directive/taxonomies.html'"></div>
        `
    };

    function Controller($scope, $element, $attrs, $stateParams) {
        'ngInject';

        var vm = this;
        vm.isCurrentState = (id) => ($stateParams.term === $scope.term && $stateParams.id === id);
        vm.triggerOnClick = (taxonomy) => {
            if (_.isFunction(vm.onClick) && !vm.isCurrentState(taxonomy.id)) {
                return vm.onClick();
            }
        }
    }
}
