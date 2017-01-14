angular.module('posts').controller('PostsControler',['$scope','$routeParams','$location','Authentication','Posts',function($scope,$routeParams,$location,Authentication,Posts){
    $scope.authentication = Authentication;
}]);