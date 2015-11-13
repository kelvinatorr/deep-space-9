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
      'ngAnimate','ui.router'
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
          });

      $urlRouterProvider.otherwise('/main');
      // Remove debug info when in production.
      if(window.location.host.split(':')[0] !== 'localhost') {
          $compileProvider.debugInfoEnabled(false);
      }

  }
})();

