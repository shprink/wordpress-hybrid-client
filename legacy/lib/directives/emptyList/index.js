export default function(RecursionHelper) {
    'ngInject';
    return {
        restrict: 'E',
        replace: true,
        bindToController: true,
        controller: Controller,
        controllerAs: 'emptyListCtrl',
        scope: {
            list: '=',
            text: '@',
            icon: '@'
        },
        compile: (el) => RecursionHelper.compile(el),
        template: `
            <div ng-include="'directive/emptyList.html'"></div>
        `
    };

    function Controller($log, $scope, $element, $attrs) {
        'ngInject';

        var vm = this;
        vm.getContentHeight = getContentHeight;

        function getContentHeight() {
            return $element.parent().parent()[0].offsetHeight;
        }
    }
}
