  'use strict';

var computenzControllers = angular.module('computenzControllers', []);

computenzControllers.controller('LoginCtrl', ['$scope','$http',
    function($scope,$http) {
      $http.get('/php/main.php/loginHandlerAction=login&username=' + $scope.username + '&password=' + $scope.password)
        .success(function(data){

        });
    }]);