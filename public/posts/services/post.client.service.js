angular.module('Posts').factory('PostsFactory',['$resource',function($resource){
    return $resource('/api/posts/:postID',{
        postID : '@_id'
    },{
        update : {
            method :'PUT'
        }
    });
}]);