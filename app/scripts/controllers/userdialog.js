(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:UserdialogCtrl
     * @description
     * # UserdialogCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('UserDialogCtrl', UserDialogCtrl);

    function UserDialogCtrl($mdDialog) {
        var vm = this;

        vm.userForm = {};

        vm.user = {
            firstName: '',
            lastName: '',
            email: '',
            temporaryPassword: '',
            hasTemporaryPassword: true
        };

        vm.cancel = function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        };
        vm.save = function(user) {
            $mdDialog.hide(user);
        };
    }
})();

