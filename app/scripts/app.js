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
      'ngAnimate', 'ui.router', 'firebase'
    ]);

  app.config(['$compileProvider','$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', AppConfig]);

  function AppConfig($compileProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
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
              url: '/admin',
              templateUrl: 'views/admin.html',
              controller: 'AdminCtrl',
              controllerAs: 'ctrl'
          })
          .state('login', {
              url: '/login',
              templateUrl: 'views/login.html',
              controller: 'LoginCtrl',
              controllerAs: 'ctrl'
          })
          .state('testauth', {
              url: '/testauth',
              templateUrl: 'views/testauth.html',
              controller: 'TestauthCtrl',
              controllerAs: 'ctrl'
          });

      $urlRouterProvider.otherwise('/main');
      // Remove debug info when in production.
      if(window.location.host.split(':')[0] !== 'localhost') {
          $compileProvider.debugInfoEnabled(false);
      }

  }
})();

