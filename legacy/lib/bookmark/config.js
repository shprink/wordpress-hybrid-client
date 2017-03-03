export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.bookmarks', {
            url: "/bookmarks",
            class: 'module-bookmarks',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/bookmark.html'),
                    controller: "WPHCBookmarkController as bookmarkCtrl"
                }
            }
        });
}
