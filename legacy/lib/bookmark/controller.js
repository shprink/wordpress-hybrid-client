export default function($log, $scope, $WPHCBookmark) {
    'ngInject';

    let vm = this;
    vm.posts = [];
    vm.remove = remove;

    $scope.$on('$ionicView.enter', () => onEnter());

    function onEnter() {
        return loadPosts();
    }

    function loadPosts() {
        return $WPHCBookmark.getList().then((posts) => vm.posts = posts);
    }

    function remove(post) {
        $WPHCBookmark.remove(post);
        return loadPosts();
    }
}
