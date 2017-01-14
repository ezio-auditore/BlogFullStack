angular.module('Posts').controller('PostsControler',['$scope','$routeParams','$location','Authentication','PostsFactory',function($scope,$routeParams,$location,Authentication,PostsFactory){
    $scope.authentication = Authentication;
    
    $scope.create = function(){
        var post = new PostsFactory({
            title : this.title,
            content : this.content
        });
        
        post.$save(function(response){
            $location.path('posts/'+response._id);
        },function(errorResponse){
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.find = function(){
        $scope.posts = PostsFactory.query();
    }
    
    $scope.findOne = function(){
        $scope.post = PostsFactory.get({
           postID : $routeParams.postID 
        });
    };
    
    $scope.update = function(){
        $scope.post.$update(function(){
           $location.path('posts/'+$scope.post._id) ;
        },function(errorResponse){
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.delete = function(post){
        if(post){
            post.$remove(function(){
                for(var i in $scope.posts){
                    if($scope.posts[i] === post){
                        $scope.posts.splice(i,1);
                    }
                }
            });
        }
        else{
            $scope.post.$remove(function(){
               $location.path('posts') ;
            });
        }
    }
    
    
}]);