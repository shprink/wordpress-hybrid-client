export default function() {
    'ngInject';
    return {
        restrict: 'E',
        replace: true,
        bindToController: true,
        controller: Controller,
        controllerAs: 'commentsCtrl',
        scope: {
            postId: "@"
        },
        template: `
            <div ng-include="'directive/comments.html'"></div>
        `
    };

    function Controller($log, $scope, $element, $WPHCPost, $WPHCConfig) {
        'ngInject';

        let depth = _.get($WPHCConfig, 'post.comments.depth') || 2;
        let vm = this;
        vm.postId = parseInt(vm.postId);
        vm.comments = null;

        $WPHCPost.getComments(vm.postId).then(function(comments) {
            var comment, parent;
            if (!comments.lenght) {
                vm.comments = [];
            }
            let commentsTemp = [];
            for (let i = 0, len = comments.length; i < len; i++) {
                comment = comments[i];
                commentsTemp[comment.id] = comment;
                comment.children = [];
                if (comment.parent === 0) {
                    comment.level = 1;
                    vm.comments.push(comment);
                } else {
                    parent = commentsTemp[comment.parent];
                    comment.level = parent.level + 1;
                    if (depth === parent.level) {
                        continue;
                    }
                    parent.children.push(comment);
                }
            }
            $log.debug('wphcComments:comments', vm.comments);
        });
    }
}
