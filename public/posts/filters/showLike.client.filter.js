angular.module('Posts').filter('showLikeOrLiked', function() {
    return function(post, $scope) {
        if (post.like.likedBy.indexOf($scope.authentication.user.id) >= 0) {
            return false;
        }
        else {
            return true;
        }
    }
});
