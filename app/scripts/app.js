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

  app.config(['$compileProvider','$httpProvider','$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', AppConfig]);

  function AppConfig($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
      $urlMatcherFactoryProvider.caseInsensitive(true);
      // ignore trailing slashes.
      $urlMatcherFactoryProvider.strictMode(false);
      // Remove debug info when in production.
      if(window.location.host.split(':')[0] !== 'localhost') {
          $compileProvider.debugInfoEnabled(false);
      }

  }
})();

