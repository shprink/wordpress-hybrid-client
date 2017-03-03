export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.authors', {
            url: "/authors",
            class: 'module-authors',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/authors/authors.html'),
                    controller: "WPHCAuthorsController as authorsCtrl"
                }
            }
        }).state('public.authors.id', {
            url: "/:id",
            class: 'module-authors-<%=id%>',
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/authors/author.html'),
                    controller: "WPHCAuthorController as postsCtrl"
                }
            }
        });
}
