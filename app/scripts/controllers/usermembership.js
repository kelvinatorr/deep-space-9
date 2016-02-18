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
            vm.selectedUser = u;
        }

        /**
         * Saves a users membership to firebase
         */
        function addMembership() {
            $timeout(function() {
                // Remove all false keys from the userMembership object before saving it
                angular.forEach(vm.clients.data, function(val) {
                    if(!vm.selectedUserMembership[val.$id]) {
                        delete vm.selectedUserMembership[val.$id];
                    }
                });
                vm.selectedUserMembership.$save().catch(function(error) {
                    alert('An error occured while saving to firebase!');
                });
            });
        }
    }
})();

