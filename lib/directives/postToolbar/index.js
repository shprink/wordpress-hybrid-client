export default function() {
    return {
        bindToController: true,
        replace: true,
        controller: Controller,
        controllerAs: 'postToolbarCtrl',
        restrict: 'E',
        scope: {
            post: '='
        },
        template: `
            <div ng-include="'directive/postToolbar.html'"></div>
        `
    };

    function Controller($scope, $element, $attrs, $WPHCTaxonomies, $WPHCSocialSharing, $WPHCBookmark) {
        'ngInject';

        var vm = this;
        vm.isBookmarked = $WPHCBookmark.isBookmarked(vm.post);
        vm.hasBookmark = angular.isDefined($attrs.showBookmark);
        vm.hasShare = angular.isDefined($attrs.showShare);
        vm.terms = vm.post._embedded['https://api.w.org/term'];
        vm.showTaxonomies = showTaxonomies;
        vm.share = share;
        vm.bookmark = bookmark;

        function showTaxonomies(translation, list, term) {
            return $WPHCTaxonomies.showTaxonomiesInModal(translation, list, term, 'post');
        };

        function bookmark() {
            return vm.isBookmarked = $WPHCBookmark.toggle(vm.post);
        };

        function share(platform, title, link) {
            return $WPHCSocialSharing.share(platform, title, link);
        };
    }
}
