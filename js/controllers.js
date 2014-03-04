  'use strict';

var computenzControllers = angular.module('computenzControllers', []);

  computenzControllers.controller('RegCtrl', ['$scope','$http',
    function($scope,$http) {

    }]);

  computenzControllers.controller('LoginCtrl', ['$scope','$http','$location', 'UserService',
    function($scope,$http,$location,UserService) {
      $scope.sendForm = function(){
        $http.get('/php/main.php/loginHandlerAction=login&username=' + $scope.user.username + '&password=' + $scope.user.password).success(function(data){
          if(data.authenticated === true && data.username === $scope.user.username){
            UserService.setUsername(data.username);
            //$location.path('/home');
            $scope.message = 'Your login succeeded';
          }else{
            $scope.message = 'Your login failed';
          }
        });
      };
    }]).service('UserService', function(){
      var user = {
        username: null,
        firstname: null,
        lastname: null
      };

      return {
        getUsername: function(){
          console.log('userService get', user.username);
          return user.username;
        },
        setUsername: function(n){
          user.username = n;
          console.log('userService set', n, user.username);
        },

        call: function(prop,val){
          if(val){
            user[prop] = val;
          }
          return user[prop];
        }
      };

    });



  computenzControllers.controller('ProfileCtrl', ['$scope', '$routeParams',
    function($scope,$http) {

    }]);

  computenzControllers.controller('BrowseCtrl', ['$scope','$http',
    function($scope,$http) {

    }]);