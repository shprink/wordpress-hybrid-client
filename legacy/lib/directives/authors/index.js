export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'authorsCtrl',
        restrict: 'E',
        scope: {
            authors: '='
        },
        template: require('./index.html')
    };

    function Controller($log, $scope) {
        'ngInject';
        var vm = this;
    }
}
