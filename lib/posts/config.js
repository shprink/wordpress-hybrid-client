export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.posts', {
            url: "/posts",
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/posts/list.html'),
                    controller: "WPHCPostsController as postsCtrl"
                }
            }
        }).state('public.posts.id', {
            url: "/:id",
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/posts/item.html'),
                    controller: "WPHCPostController as postCtrl"
                }
            }
        });
}
