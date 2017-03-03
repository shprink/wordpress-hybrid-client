import "v-accordion/dist/v-accordion.js";
import "v-accordion/dist/v-accordion.css";

export default function() {
    'ngInject';
    return {
        restrict: 'E',
        replace: false,
        bindToController: true,
        controller: Controller,
        controllerAs: 'menuCtrl',
        scope: {
            list: "="
        },
        template: `
            <div ng-include="'directive/menu.html'"></div>
        `
    };

    function Controller($log, $scope, $element, $attrs) {
        'ngInject';

        var vm = this;
    }
}
