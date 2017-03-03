export default function(RecursionHelper) {
    'ngInject';
    return {
        restrict: 'E',
        replace: true,
        bindToController: true,
        controller: Controller,
        controllerAs: 'commentCtrl',
        scope: {
            comment: "="
        },
        compile: (el) => RecursionHelper.compile(el),
        template: `
            <div ng-include="'directive/comment.html'"></div>
        `
    };

    function Controller($log, $scope, $element, $attrs) {
        'ngInject';

        var vm = this;
    }
}
