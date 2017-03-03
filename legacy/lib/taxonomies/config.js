export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.taxonomies', {
            url: "/taxonomies/:term/:postType",
            class: 'module-taxonomies-<%=term%>-<%=postType%>',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/taxonomies/list.html'),
                    controller: "WPHCTaxonomiesController as taxonomiesCtrl"
                }
            }
        })
        .state('public.taxonomies.id', {
            url: "/:id",
            class: 'module-taxonomies-<%=term%>-<%=postType%>-<%=id%>',
            params: {
                taxonomy: null
            },
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
