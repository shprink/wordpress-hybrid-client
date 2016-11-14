export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.authors', {
            url: "/authors",
            views: {
                'content': {
                    template: require("./authors.html"),
                    controller: "WPHCAuthorsController as authorsCtrl"
                }
            }
        }).state('public.authors.id', {
            url: "/:id",
            views: {
                'content@public': {
                    template: require("./author.html"),
                    controller: "WPHCAuthorController as postsCtrl"
                }
            }
        });
}
