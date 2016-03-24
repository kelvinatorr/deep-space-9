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

    function AddPositionDialogCtrl($mdDialog, $filter) {
        var vm = this;

        var newPriority =  0;
        if(vm.positions.data.length > 0) {
            newPriority = $filter('orderBy')(vm.positions.data, '-priority')[0].priority + 1;
        }

        vm.positionForm = {};

        vm.newPosition = {
            name: '',
            description: '',
            priority: newPriority,
            latestUpdate: 'Created by ' + vm.userDisplayName + ', ',
            latestUpdateDateTime: ''
        };

        vm.cancel = cancel;

        vm.save = save;

        function cancel(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        }

        function save(newPosition) {
            var currentDate = new Date();
            newPosition.latestUpdateDateTime = currentDate.toJSON();
            $mdDialog.hide(newPosition);
        }

    }

})();
