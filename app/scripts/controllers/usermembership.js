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

    function UserMembershipCtrl(users, clients, FirebaseRef, $firebaseObject, $timeout) {
        var vm = this;

        vm.users =  users;

        vm.clients = clients;

        vm.selectedUser = {};

        vm.selectUser = selectUser;

        vm.selectedUserMembership = {};

        vm.addMembership = addMembership;

        /**
         * select the top user at the start
         */
        vm.selectUser(vm.users.data[0]);

        function selectUser(u) {
            vm.selectedUserMembership = $firebaseObject(FirebaseRef.ref.child('userMembership/' + u.$id));
            console.log(vm.selectedUserMembership);
            vm.selectedUser = u;
        }

        function addMembership() {
            $timeout(function() {
                vm.selectedUserMembership.$save();
            });

        }


    }
})();

