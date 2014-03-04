
(function(){

  'use strict';

  computenzApp = angular.module('computenzApp', [
    'ngRoute',
    'computenzControllers'
  ]);

  computenzApp.config(['$routeProvider'],
    function($routeProvider){
      $routeProvider.
        when('/register', {
          templateUrl: 'partials/register.html',
          controller: 'RegCtrl'
        }).
        when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        }).
        when('/profile/:userID', {
          templateUrl: 'partials/profile.html',
          controller: 'ProfileCtrl'
        }).
        when('/browse', {
          templateUrl: 'partials/browse.html',
          controller: 'BrowseCtrl'
        });
    });

}());