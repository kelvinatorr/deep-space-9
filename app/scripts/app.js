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
      'ngAnimate', 'ui.router', 'firebase','ngMaterial','ngMessages'
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
              url: '/admin',
              templateUrl: 'views/admin.html',
              controller: 'AdminCtrl',
              controllerAs: 'ctrl'
          })
          .state('login', {
              url: '/login',
              templateUrl: 'views/login.html',
              controller: 'LoginCtrl',
              controllerAs: 'vm'
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
          .defaultIconSet("./images/avatars.svg", 128)
          .icon("menu"       , "./images/menu.svg"        , 24)
          .icon("share"      , "./images/share.svg"       , 24)
          .icon("google_plus", "./images/google_plus.svg" , 512)
          .icon("hangouts"   , "./images/hangouts.svg"    , 512)
          .icon("twitter"    , "./images/twitter.svg"     , 512)
          .icon("phone"      , "./images/phone.svg"       , 512);

  }
})();

