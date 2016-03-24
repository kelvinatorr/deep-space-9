(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:PositionDetailCtrl
     * @description
     * # PositionDetailCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('PositionDetailCtrl', PositionDetailCtrl);

    function PositionDetailCtrl(positionDetail, $stateParams, $mdDialog, $mdMedia, CurrentUser) {
        var vm = this;

        vm.clientId = $stateParams.clientId;

        vm.positionDetail = positionDetail;
        console.log(vm.positionDetail);
        //console.log($stateParams);

        vm.edit = edit;

        vm.addCandidate = addCandidate;

        vm.addNote = addNote;

        vm.addFile = addFile;

        vm.editNote = editNote;

        /**
         * Edit the name, description, or priority of the position
         */
        function edit(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var dialogPromise = $mdDialog.show(
                {
                    controller: 'AddPositionDialogCtrl',
                    controllerAs: 'vm',
                    locals: {
                        action: 'Edit ' + vm.positionDetail.data.name,
                        userDisplayName: CurrentUser.data.firstName + ' ' + CurrentUser.data.lastName,
                        position: vm.positionDetail.data
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
                //positions.createPosition(newPosition, vm.client.$id).catch(function(error) {
                //    alert(error);
                //});
            });
        }

        function addCandidate() {

        }

        function addNote() {

        }

        function addFile() {

        }

        function editNote(note) {

        }
    }

})();
