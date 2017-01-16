angular.module('Posts').controller('PostsController', ['$scope', '$routeParams', '$location', 'Authentication', 'PostsFactory', 'notificationFactory', 'LikesFactory', function($scope, $routeParams, $location, Authentication, PostsFactory, notificationFactory, LikesFactory) {
    $scope.authentication = Authentication;

    $scope.create = function() {
        var post = new PostsFactory({
            title: this.title,
            content: this.content
        });

        post.$save(function(response) {
            // $location.path('posts/' + response._id);
            notificationFactory.success("Succesfully posted");

            $scope.content = '';
            $scope.title = '';

        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
            notificationFactory.error($scope.error);
        });
    };

    $scope.find = function() {
        $scope.posts = PostsFactory.query();
    }

    $scope.findOne = function() {
        $scope.post = PostsFactory.get({
            postID: $routeParams.postID
        });
    };

    $scope.update = function() {
        $scope.post.$update(function() {
            $location.path('posts/' + $scope.post._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
            notificationFactory.error($scope.error);
        });
    };

    $scope.delete = function(post) {
        if (post) {
            post.$remove(function() {
                for (var i in $scope.posts) {
                    if ($scope.posts[i] === post) {
                        $scope.posts.splice(i, 1);
                        notificationFactory.success("Succesfully deleted post");
                    }
                }
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                notificationFactory.error($scope.error);
            });
        }
        else {
            $scope.post.$remove(function() {
                //$location.path('posts');
                notificationFactory.success("Succesfully deleted post");
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                notificationFactory.error($scope.error);
            });
        }
    }
    $scope.like = function(post) {
        var like = new LikesFactory(post);
        like.$update(function() {
            notificationFactory.success("Successfully liked");
            $scope.post.like.likeCount++;
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
            notificationFactory.error($scope.error);
        });
    }


}]);
