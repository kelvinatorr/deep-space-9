(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:AddpositiondialogCtrl
     * @description
     * # AddpositiondialogCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('AddPositionDialogCtrl', AddPositionDialogCtrl);

    function AddPositionDialogCtrl($mdDialog) {
        var vm = this;

        vm.positionForm = {};

        vm.newPosition = {
            name: '',
            description: ''
        };

        vm.cancel = cancel;

        vm.save = save;

        function cancel(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        }

        function save(user) {
            $mdDialog.hide(user);
        }

    }

})();
