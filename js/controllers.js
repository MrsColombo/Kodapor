
(function(){

  'use strict';

  computenzControllers = angular.module('computenzControllers', []);

  computenzControllers.controller('RegCtrl', ['$scope','$http',
    function($scope,$http) {

    }]);

  computenzControllers.controller('LoginCtrl', ['$scope','$http',
    function($scope,$http) {
      $http.get('/php/main.php/loginHandlerAction=login&username=' + $scope.username + '&password=' + $scope.password)
        .success(function(data){

        });
    }]);


  computenzControllers.controller('ProfileCtrl', ['$scope', '$routeParams',
    function($scope,$http) {

    }]);

  computenzControllers.controller('BrowseCtrl', ['$scope','$http',
    function($scope,$http) {

    }]);

}());