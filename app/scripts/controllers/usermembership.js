(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:UsermembershipCtrl
     * @description
     * # UsermembershipCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('UserMembershipCtrl', UserMembershipCtrl);

    function UserMembershipCtrl(users) {
        var vm = this;

        vm.users =  users;

        vm.selectedUser = vm.users.data[0];

        vm.selectUser = selectUser;

        function selectUser(u) {
            vm.selectedUser = u;
        }


    }
})();

