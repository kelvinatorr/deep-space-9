(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name deepspace9App.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the deepspace9App
   */
  angular.module('deepspace9App')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state, currentUser) {
      var vm = this;

      vm.displayName = currentUser.data.firstName;

      vm.userRole = currentUser.data.role;

      vm.logout = logout;

      vm.goToAdmin = goToAdmin;

      vm.toggleSideNav = toggleSideNav;

      function logout() {
          currentUser.logout();
          $state.go('login');
      }

      function goToAdmin() {
          $state.go('usermembership');
      }

      function toggleSideNav() {
          $state.go('clients');
      }

  }
})();

