(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:PositionsCtrl
     * @description
     * # PositionsCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('PositionsCtrl', PositionsCtrl);

    function PositionsCtrl(positions, client, $mdDialog, $mdMedia, CurrentUser) {
        var vm = this;

        vm.positions = positions;

        vm.client = client;

        vm.addPosition = addPosition;

        function addPosition(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var dialogPromise = $mdDialog.show(
                {
                    controller: 'AddPositionDialogCtrl',
                    controllerAs: 'vm',
                    locals: {
                        action: 'Add',
                        positions: vm.positions,
                        userDisplayName: CurrentUser.data.firstName + ' ' + CurrentUser.data.lastName
                    },
                    bindToController: true,
                    templateUrl: 'views/add-position-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
                }
            );

            dialogPromise.then(function(newPosition) {
                positions.createPosition(newPosition, vm.client.$id).catch(function(error) {
                    alert(error);
                });
            });
        }

    }
})();

