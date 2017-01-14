angular.module('posts').factory('Posts',['$resource',function($resource){
    return $resource('/api/posts/:postID',{
        postID : '@_id'
    },{
        update : {
            mehof :'PUT'
        }
    });
}]);