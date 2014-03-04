'use strict';

/* Services */

var computenzServices = angular.module('computenzServices', [])

  .value('version', '0.1');

  computenzServices.service('UserService', function(){

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
      getFirstname: function(){
        return user.firstname;
      },
      getFullName: function(){
        return user.firstname + ' ' + user.lastname;
      },
      setUser: function(n){
        user = n;
        console.log('userService set', n, user);
      },
      unsetUser: function(){
        for (var prop in user) {
          user[prop] = null;
        }
      },
      call: function(prop,val){
        if(val){
          user[prop] = val;
        }
        return user[prop];
      }
    };
  });

  computenzServices.service('LoginToggleService', function() {

    var linkData = {
      link: 'login',
      text: 'login'
    };

    var status = false;

    return {
      getLinkData: function(){
        return linkData;
      },
      setLinkData: function(bool) {
        if (bool) {
          linkData.link = 'home';
          linkData.text = 'logout';
          status = true;
        }
        else {
          linkData.link = 'login';
          linkData.text = 'login';
          status = false;
        }
      },
      getStatus: function() {
        return status;
      }
    };

  });











