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
            password: ''
        };

        vm.cancel = function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        };
        vm.save = function(user) {
            console.log('saving');
            //$mdDialog.hide(user);
        };
    }
})();

