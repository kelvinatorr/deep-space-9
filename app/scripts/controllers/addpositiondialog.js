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
            description: '',
            priority: 0
        };

        vm.nameChangeWatcher = nameChangeWatcher;

        vm.cancel = cancel;

        vm.save = save;

        function nameChangeWatcher(newName) {
            if(newName) {
                var newNameFormat = newName.toLowerCase().replace(/\s/g, '');
                var testMatch = vm.positions.data.filter(function(e) {return e.$id.toLowerCase() === newNameFormat;});
                vm.positionForm.name.$setValidity('unique', testMatch.length === 0);
            } else {
                vm.positionForm.name.$setValidity('unique', true);
            }
        }

        function cancel(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        }

        function save(newPosition) {
            $mdDialog.hide(newPosition);
        }

    }

})();
