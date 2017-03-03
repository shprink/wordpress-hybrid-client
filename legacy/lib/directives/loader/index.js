export default function() {
    'ngInject';
    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        bindToController: true,
        controller: Controller,
        controllerAs: 'loaderCtrl',
        scope: {
            onLoad: "&"
        },
        template: `
            <div ng-include="'directive/loader.html'"></div>
        `
    };

    function Controller($scope, $element, $attrs, $state, $log, $WPHCConfig, $timeout) {
        'ngInject';

        var vm = this;
        vm.getContentHeight = getContentHeight;
        vm.attempt = 0;
        vm.attemptMax = _.get($WPHCConfig, 'api.maxAttempt');
        vm.isAttemptMaxReached = false;
        vm.promiseLoad = $attrs.onLoad != null;
        vm.load = load;

        if (!vm.promiseLoad) {
            return;
        }

        $timeout(function() {
            return vm.load();
        }, 500);


        function load(reInit) {
            if (reInit == null) {
                reInit = false;
            }
            $log.info('reinit load', reInit);
            if (reInit) {
                vm.attempt = 0;
                vm.isAttemptMaxReached = false;
            }
            $log.info('wphcLoader attempt: ' + vm.attempt);
            return vm.onLoad().then(success)["catch"](function() {
                error();
                if (vm.attempt < $WPHCConfig.api.maxAttempt) {
                    return $timeout(function() {
                        vm.attempt++;
                        return vm.load();
                    }, 500);
                } else {
                    return vm.isAttemptMaxReached = true;
                }
            });
        };

        function getContentHeight() {
            return $element.parent().parent()[0].offsetHeight;
        };

        function success() {
            vm.isLoaded = true;
            return vm.attempt = 0;
        };

        function error() {
            return vm.isLoaded = false;
        };
    }
}
