angular.module('Posts').factory('LikesFactory', ['$resource', function($resource) {
    return $resource('/api/posts/like/:postID', {
        postID: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
