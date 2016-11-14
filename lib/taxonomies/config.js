export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.taxonomies', {
            url: "/taxonomies/:term/:postType",
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/taxonomies/list.html'),
                    controller: "WPHCTaxonomiesController as taxonomiesCtrl"
                }
            }
        })
        .state('public.taxonomies.slug', {
            url: "/:slug",
            views: {
                'content@public': {
                    templateProvider: ($templateCache, $stateParams) => {
                        if ($stateParams.postType != 'post') {
                            return $templateCache.get('module/customPosts/list.html');
                        }
                        return $templateCache.get('module/posts/list.html');
                    },
                    controllerProvider: function($stateParams) {
                        if ($stateParams.postType != 'post') {
                            return "WPHCTaxonomiesPostsController as customPostsCtrl";
                        }
                        return "WPHCTaxonomiesPostsController as postsCtrl";
                    }
                }
            }
        });
}
