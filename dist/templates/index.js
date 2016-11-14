let mod = angular.module('wordpress-hybrid-client.overwriteTemplates', []);

mod.run(($templateCache) => {
    // customPosts
    $templateCache.put('customPosts/movie/item.html', require('!html!./customPosts/movie/item.html'));
    $templateCache.put('customPosts/movie/list.html', require('!html!./customPosts/movie/list.html'));

    // BELOW ARE ALL THE TEMPLATES YOU CAN OVERWRITE IN WPHC
    // To do so go in the `lib/templates` folder, copy the template you want to modify
    // then past it in the current folder `config/templates`
    // to register this overwritten template uncomment the corresponding line below
    // and make sure the path point to your file:
    // $templateCache.put(<partYouShouldNotModify>, require('!html!<path>'));

    // Modules
    // $templateCache.put('module/posts/item.html', require('!html!./module/posts-item.html'));
    // $templateCache.put('module/posts/list.html', require('!html!./module/posts-list.html'));
    // $templateCache.put('module/customPosts/item.html', require('!html!./module/customPosts-item.html'));
    // $templateCache.put('module/customPosts/list.html', require('!html!./module/customPosts-list.html'));
    // $templateCache.put('module/pages/item.html', require('!html!./module/pages-item.html'));
    // $templateCache.put('module/pages/list.html', require('!html!./module/pages-list.html'));
    // $templateCache.put('module/taxonomies/list.html', require('!html!./module/taxonomies-list.html'));
    // $templateCache.put('module/search.html', require('!html!./module/search.html'));
    // $templateCache.put('module/params.html', require('!html!./module/params.html'));
    // $templateCache.put('module/menu.html', require('!html!./module/menu.html'));
    // $templateCache.put('module/bookmark.html', require('!html!./module/bookmark.html'));
    // $templateCache.put('module/about.html', require('!html!./module/about.html'));

    // Directives
    // $templateCache.put('directive/author.html', require('!html!./directive/author.html'));
    // $templateCache.put('directive/comment.html', require('!html!./directive/comment.html'));
    // $templateCache.put('directive/comments.html', require('!html!./directive/comments.html'));
    // $templateCache.put('directive/taxonomies.html', require('!html!./directive/taxonomies.html'));
    // $templateCache.put('directive/emptyList.html', require('!html!./directive/emptyList.html'));
    // $templateCache.put('directive/loader.html', require('!html!./directive/loader.html'));
    // $templateCache.put('directive/menu.html', require('!html!./directive/menu.html'));
    // $templateCache.put('directive/page.html', require('!html!./directive/page.html'));
    // $templateCache.put('directive/pages.html', require('!html!./directive/pages.html'));
    // $templateCache.put('directive/post.html', require('!html!./directive/post.html'));
    // $templateCache.put('directive/posts.html', require('!html!./directive/posts.html'));
    // $templateCache.put('directive/postToolbar.html', require('!html!./directive/postToolbar.html'));
});

export default mod = mod.name;
