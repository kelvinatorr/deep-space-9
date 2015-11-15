'use strict';

/**
 * @ngdoc function
 * @name deepspace9App.controller:TestauthCtrl
 * @description
 * # TestauthCtrl
 * Controller of the deepspace9App
 */
angular.module('deepspace9App')
  .controller('TestauthCtrl', function ($scope, $firebaseObject) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      var self = this;

      var ref = new Firebase("https://deepspace9.firebaseio.com");


      self.loadData = function() {
          console.log('loading data');
          ref.child('clients').set({
              unfps: 'United Federation of Planets Starfleet',
              houseLannister: 'House Lannister'
          });

          ref.child('members').set({
              unfps: {
                  '0f47e738-53fb-40c8-a0ed-5d88e5cf24ae': true,
                  '83c8f024-c957-499e-8d82-75f35a0d9ade': true
              },
              houseLannister: {}
          });

          ref.child('candidates').set({
              'blee': {
                  name: 'Bruce Lee'
              },
              'jchan': {
                  name: 'Jackie Chan'
              },
              'jlPicard': {
                  name: 'Jean Luc Picard'
              }
          });

          ref.child('positions').set({
              unfps: {
                  'kungFuMaster': {
                      candidates: {
                          'blee': true,
                          'jchan': true
                      }
                  },
                  'barBack': {
                      candidates: {

                      }
                  }
              },
              houseLannister: {}
          });
      };



      self.loggedInAs = '';

      // Create a callback which logs the current auth state
      function authDataCallback(authData) {
          console.log(authData);
          if (authData) {
              self.loggedInAs = $firebaseObject(ref.child('users/' + authData.uid));
              console.log("User " + authData.uid + " is logged in with " + authData.provider);
          } else {
              console.log("User is logged out");
          }
      }
    // Register the callback to be fired every time auth state changes

      ref.onAuth(authDataCallback);
  });
