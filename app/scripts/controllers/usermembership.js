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

    function UserMembershipCtrl(users, clients) {
        var vm = this;

        vm.users =  users;

        vm.clients = clients;

        vm.selectedUser = {};

        vm.selectUser = selectUser;

        /**
         * select the top user at the start
         */
        vm.selectUser(vm.users.data[0]);

        function selectUser(u) {
            vm.selectedUser = u;
        }


    }
})();

