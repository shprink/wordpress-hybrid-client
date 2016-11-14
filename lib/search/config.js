export default function($stateProvider) {
    'ngInject';

    $stateProvider.state('public.search', {
        url: "/search/:query",
        views: {
            'content': {
                templateProvider: ($templateCache) => $templateCache.get('module/search.html'),
                controller: "WPHCSearchController as searchCtrl"
            }
        }
    });
}
