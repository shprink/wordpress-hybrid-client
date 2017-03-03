export default function($stateProvider) {
    'ngInject';

    $stateProvider.state('public.search', {
        url: "/search/:query",
        class: 'module-search',
        views: {
            'content': {
                templateProvider: ($templateCache) => $templateCache.get('module/search.html'),
                controller: "WPHCSearchController as searchCtrl"
            }
        }
    });
}
