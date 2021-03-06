var mainApplicationModuleName = "stark-blog";
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'angular.filter', 'Users', 'Posts', 'Notify', 'firebase']);

mainApplicationModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);
if (window.location.hash === '#_=_') window.location.hash = '#!';
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
