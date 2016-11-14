export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.compose', {
            url: '/compose/:slug',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/compose.html'),
                    controller: "WPHCComposeController as composeCtrl"
                }
            }
        });
}
