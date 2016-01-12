(function(){

  'use strict';

  /**
   * @ngdoc overview
   * @name deepspace9App
   * @description
   * # deepspace9App
   *
   * Main module of the application.
   */
  var app = angular.module('deepspace9App', [
      'ngAnimate', 'ui.router', 'firebase','ngMaterial','ngMessages', 'md.data.table'
    ]);


    app.config(['$compileProvider','$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$mdIconProvider',
        '$mdThemingProvider', AppConfig]);

    app.constant('APIEndpoint', 'https://deepspace9.firebaseio.com/');

  function AppConfig($compileProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $mdIconProvider, $mdThemingProvider) {
      $urlMatcherFactoryProvider.caseInsensitive(true);
      // ignore trailing slashes.
      $urlMatcherFactoryProvider.strictMode(false);

      $stateProvider
          .state('main', {
              url: '/main',
              templateUrl: 'views/main.html',
              controller: 'MainCtrl',
              controllerAs: 'ctrl'
          })
          .state('admin', {
              abstract: true,
              url: '/admin',
              template: '<ui-view></ui-view>'
              //controller: 'AdminCtrl',
              //controllerAs: 'ctrl'
          })
          .state('users', {
              parent: 'admin',
              url: '/users',
              templateUrl: 'views/users.html',
              controller: 'UsersCtrl',
              controllerAs: 'vm',
              resolve: {
                  initQuery: function() {
                      return {
                          order: 'name',
                          limit: 5,
                          page: 1
                      };
                  },
                  users: ['initQuery', 'Users','$state', function(initQuery, Users, $state) {
                      return Users.getUsers(initQuery).catch(function() {
                          $state.go('login');
                      });
                  }]
              }
          })
          .state('login', {
              url: '/login',
              templateUrl: 'views/login.html',
              controller: 'LoginCtrl',
              controllerAs: 'vm',
              resolve: {
                  fire: ['APIEndpoint', function(APIEndpoint) {
                      return new Firebase(APIEndpoint);
                  }]
              }
          })
          .state('testauth', {
              url: '/testauth',
              templateUrl: 'views/testauth.html',
              controller: 'TestauthCtrl',
              controllerAs: 'ctrl'
          })
          .state('materialplayground', {
              url: '/materialplayground',
              templateUrl: 'views/materialplayground.html',
              controller: 'MaterialplaygroundCtrl',
              controllerAs: 'ctrl'
          });

      $urlRouterProvider.otherwise('/login');
      // Remove debug info when in production.
      if(window.location.host.split(':')[0] !== 'localhost') {
          $compileProvider.debugInfoEnabled(false);
      }

      $mdThemingProvider.theme('default')
          .primaryPalette('light-blue')
          .accentPalette('deep-purple')
          .warnPalette('red');

      $mdIconProvider
          .icon("share"      , "./images/share.svg"       , 24)
          .defaultIconSet('images/material-icons/svg-sprite-maps.svg', 128)
          .icon('menu', 'images/material-icons/menu.svg', 24)
          //.iconSet("glyphicons", "fonts/glyphicons-halflings-regular.svg", 24);
          .icon('call', 'images/material-icons/ic_call_24px.svg', 24)
          .iconSet('action', 'images/material-icons/action-icons.svg', 24)
          .iconSet('alert', 'images/material-icons/alert-icons.svg', 24)
          .iconSet('av', 'images/material-icons/av-icons.svg', 24)
          .iconSet('communication', 'images/material-icons/communication-icons.svg', 24)
          .iconSet('content', 'images/material-icons/content-icons.svg', 24)
          .iconSet('device', 'images/material-icons/device-icons.svg', 24)
          .iconSet('editor', 'images/material-icons/editor-icons.svg', 24)
          .iconSet('file', 'images/material-icons/file-icons.svg', 24)
          .iconSet('hardware', 'images/material-icons/hardware-icons.svg', 24)
          .iconSet('icons', 'images/material-icons/icons-icons.svg', 24)
          .iconSet('image', 'images/material-icons/image-icons.svg', 24)
          .iconSet('maps', 'images/material-icons/maps-icons.svg', 24)
          .iconSet('navigation', 'images/material-icons/navigation-icons.svg', 24)
          .iconSet('notification', 'images/material-icons/notification-icons.svg', 24)
          .iconSet('social', 'images/material-icons/social-icons.svg', 24)
          .iconSet('toggle', 'images/material-icons/toggle-icons.svg', 24);

  }
})();

