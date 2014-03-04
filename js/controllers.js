'use strict';

var computenzControllers = angular.module('computenzControllers', []);

computenzControllers.controller('appCtrl', ['$scope','$http','UserService','LoginToggleService',
  function($scope,$http, UserService, LoginToggleService) {
    
    $scope.updateLogin = function(statusObj) {
      $scope.whereToGo = statusObj;
    };

    $scope.logOut = function() {
      var requestData = {loginHandlerAction: 'logOut'};
      $http.post('php/main.php', requestData).success(function(data){
        UserService.unsetUser();
        LoginToggleService.setLinkData(false);
      });
    };

    $scope.updateLogin(LoginToggleService.getLinkData());

}]);

computenzControllers.controller('RegCtrl', ['$scope','$http', function($scope,$http) {

}]);

computenzControllers.controller('LoginCtrl', ['$scope','$http','$location', 'UserService', 'LoginToggleService',
  function($scope,$http,$location,UserService,LoginToggleService) {

    $scope.sendForm = function(){

      var requestData = {
        loginHandlerAction: 'login',
        username: $scope.user.username,
        password: $scope.user.password
      };

      // Test: PerCenterwall GzrTCRljCu
      
      $http.post('php/main.php', requestData).success(function(data){
        if(data && data.username === $scope.user.username){
          UserService.setUser(data);
          LoginToggleService.setLinkData(true);
          $location.path('profile/' + UserService.getUsername());
          $scope.message = 'Your login succeeded';
        }else{
          $scope.message = data;
        }
      });
    };

}]);



computenzControllers.controller('ProfileCtrl', ['$scope','$routeParams','UserService', function($scope,$routeParams, UserService) {
  $scope.getFullName = UserService.getFullName;
}]);

computenzControllers.controller('BrowseCtrl', ['$scope','$http', function($scope,$http) {

}]);