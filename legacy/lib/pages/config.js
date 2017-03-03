export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.pages', {
            url: "/pages",
            class: 'module-pages',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/pages/list.html'),
                    controller: "WPHCPagesController as pagesCtrl"
                }
            }
        }).state('public.pages.id', {
            url: "/:id",
            class: 'module-pages-<%=id%>',
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/pages/item.html'),
                    controller: "WPHCPageController as pageCtrl"
                }
            }
        });
}
