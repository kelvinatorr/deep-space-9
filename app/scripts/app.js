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

      var resolveCurrentUser = ['CurrentUser','$state', function(CurrentUser, $state) {
          return CurrentUser.getCurrentUser().catch(function() {
              $state.go('login');
          });
      }];

      $stateProvider
          .state('main', {
              abstract: true,
              url: '/main',
              templateUrl: 'views/main.html',
              controller: 'MainCtrl',
              controllerAs: 'vm',
              resolve: {
                  currentUser: resolveCurrentUser
              }
          })
          .state('clients', {
              parent: 'main',
              url: '/clients',
              templateUrl: 'views/clients.html',
              controller: 'ClientsCtrl',
              controllerAs: 'vm',
              resolve: {
                  clients: ['currentUser','Clients','$state', function(currentUser, Clients, $state) {
                      return Clients.getData(currentUser.data.$id).then(function(clients) {
                          if(clients.data.length < 2) {
                              //user goes straight to positions view if they only have one client
                              $state.go('positions', {clientId: clients.data[0].$id});
                              return;
                          }
                          return clients;
                      });
                  }]
              }
          })
          .state('positions', {
              parent: 'main',
              url: '/positions/:clientId',
              templateUrl: 'views/positions.html',
              controller: 'PositionsCtrl',
              controllerAs: 'vm',
              resolve: {
                  positions: ['Positions','$stateParams', function(Positions, $stateParams) {
                      return Positions.getData($stateParams.clientId);
                  }],
                  client: ['Clients','$stateParams','$state', function(Clients, $stateParams, $state) {
                      return Clients.getClient($stateParams.clientId).catch(function() {
                          $state.go('login');
                      });
                  }]
              }
          })
          .state('positionDetail', {
              parent: 'main',
              url: '/positions/:clientId/:positionId',
              templateUrl: 'views/position-detail.html',
              controller: 'PositionDetailCtrl',
              controllerAs: 'vm'
              //resolve: {
              //    positions: ['Positions','$stateParams', function(Positions, $stateParams) {
              //        return Positions.getData($stateParams.clientId);
              //    }]
              //}
          })
          .state('admin', {
              abstract: true,
              url: '/admin',
              templateUrl: 'views/admin.html',
              controller: 'AdminCtrl',
              controllerAs: 'vm',
              resolve: {
                  currentUser: resolveCurrentUser
              }
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
                          order: 'lastName',
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
          .state('usermembership', {
              parent: 'admin',
              url: '/usermembership',
              templateUrl: 'views/user-membership.html',
              controller: 'UserMembershipCtrl',
              controllerAs: 'vm',
              resolve: {
                  users: ['Users','$state', function(Users, $state) {
                      return Users.getAllUsers().catch(function() {
                          $state.go('login');
                      });
                  }],
                  clients: ['AdminClients', function(AdminClients, $state) {
                      return AdminClients.getData().catch(function() {
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

      $urlRouterProvider.otherwise('/main/clients');
      // Remove debug info when in production.
      if(window.location.host.split(':')[0] !== 'localhost') {
          $compileProvider.debugInfoEnabled(false);
      }

      // DON'T Forget to change the CSS Class 'gl-toolbar-colors' when you change this!
      $mdThemingProvider.theme('default')
          .primaryPalette('light-blue')
          .accentPalette('light-green')
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

