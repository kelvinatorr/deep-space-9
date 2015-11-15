'use strict';

/**
 * @ngdoc function
 * @name deepspace9App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the deepspace9App
 */
angular.module('deepspace9App')
  .controller('LoginCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      var self = this;

      var ref = new Firebase('https://deepspace9.firebaseio.com/');

      self.loginFormModel = {
          email: '',
          password: ''
      };

      self.login = login;


      // Register the callback to be fired every time auth state changes
      ref.onAuth(authDataCallback);

      function authDataCallback(authData) {
          if (authData) {
              console.log("User " + authData.uid + " is logged in with " + authData.provider);
          } else {
              console.log("User is logged out");
          }
          console.log(authData);
      }

      function login(loginData) {
          ref.authWithPassword({
              email : loginData.email,
              password : loginData.password
          }, function(error, authData) {
              if (error) {
                  console.log("Login Failed!", error);
              } else {
                  console.log("Authenticated successfully with payload:", authData);
                  console.log(authData);
              }
          });
      }
  });
