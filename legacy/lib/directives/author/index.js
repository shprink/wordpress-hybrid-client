export default function() {
    return {
        restrict: 'E',
        replace: false,
        bindToController: true,
        controller: Controller,
        controllerAs: 'authorCtrl',
        scope: {
            author: "=",
            date: "="
        },
        template: `
            <div ng-include="'directive/author.html'"></div>
        `
    };

    function Controller($log, $scope, $element, $attrs, $state) {
        'ngInject';

        var vm = this;
        vm.addLink = typeof $attrs.addLink !== 'undefined';
        vm.onClick = onClick;

        function onClick() {
            if (vm.addLink) {
                return $state.go('public.authors.id', {
                    id: vm.author.id
                });
            }
        };
    }
}
