'use strict';

/**
 * @ngdoc function
 * @name deepspace9App.controller:MaterialplaygroundCtrl
 * @description
 * # MaterialplaygroundCtrl
 * Controller of the deepspace9App
 */
angular.module('deepspace9App')
  .controller('MaterialplaygroundCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


      document.getElementById('testSubList').style.height = 0 + 'px';

      var subListShowing = false;

      $scope.toggleSublist = function() {
          console.log('changing!');
          if(!subListShowing) {
              var height = 0;
              for(var i = 0; i < 48 * 2; i++) {
                  height += i;
                  console.log(height);
                  document.getElementById('testSubList').style.height = i + 'px';
              }
          } else {
              document.getElementById('testSubList').style.height = 0 + 'px';
          }
          subListShowing = !subListShowing;
          //$scope.$apply();
      };

      //$scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleLeft = buildToggler('left');
      $scope.isOpenLeft = function(){
          return $mdSidenav('left').isOpen();
      };
      $scope.toggleRight = buildToggler('right');
      $scope.isOpenRight = function(){
          return $mdSidenav('right').isOpen();
      };
      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      //function debounce(func, wait, context) {
      //    var timer;
      //    return function debounced() {
      //        var context = $scope,
      //            args = Array.prototype.slice.call(arguments);
      //        $timeout.cancel(timer);
      //        timer = $timeout(function() {
      //            timer = undefined;
      //            func.apply(context, args);
      //        }, wait || 10);
      //    };
      //}
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      //function buildDelayedToggler(navID) {
      //    return debounce(function() {
      //        $mdSidenav(navID)
      //            .toggle()
      //            .then(function () {
      //                $log.debug("toggle " + navID + " is done");
      //            });
      //    }, 200);
      //}
      function buildToggler(navID) {
          return function() {
              $mdSidenav(navID)
                  .toggle()
                  .then(function () {
                      $log.debug("toggle " + navID + " is done");
                  });
          };
      }

  });
