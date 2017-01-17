angular.module('Posts').controller('PostsController', ['$scope', '$routeParams', '$location', 'Authentication', 'PostsFactory', 'notificationFactory', 'LikesFactory', function($scope, $routeParams, $location, Authentication, PostsFactory, notificationFactory, LikesFactory) {
    $scope.authentication = Authentication;
    $scope.posts = [];
    $scope.create = function() {

        var post = new PostsFactory({
            title: $scope.post.title,
            content: $scope.post.content
        });

        post.$save(function(response) {
            // $location.path('posts/' + response._id);

            notificationFactory.success("Succesfully posted");
            $scope.post.content = '';
            $scope.post.title = '';
            $scope.posts.unshift(response.data);



        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
            notificationFactory.error($scope.error);
        });
    };

    $scope.find = function() {
        $scope.posts = PostsFactory.query();
        // $scope.posts.push(scopeFactory.get('addPostsScope').post);

    }
    PostsFactory.query({}, function(data) {
        $scope.posts = data;
    });

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
    };
    $scope.like = function(post) {
        var like = new LikesFactory(post);
        like.$update(function() {
            notificationFactory.success("Successfully liked");
            post.like.likeCount++;
            post.like.likedBy.push($scope.authentication.user.id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
            notificationFactory.error($scope.error);
        });
    };

    $scope.showLikeButton = function(post) {
        if (post.like.likedBy.indexOf($scope.authentication.user.id) >= 0) {
            return false;
        }
        else {
            return true;
        }
    }

}]);
