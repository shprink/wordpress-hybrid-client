export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.customPosts', {
            url: "/customPosts/:slug",
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/customPosts/list.html'),
                    controller: "WPHCCustomPostsController as customPostsCtrl"
                }
            }
        }).state('public.customPosts.id', {
            url: "/:id",
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/customPosts/item.html'),
                    controller: "WPHCCustomPostController as customPostCtrl"
                }
            }
        });
}
