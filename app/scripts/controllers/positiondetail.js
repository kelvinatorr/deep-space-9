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

        var genericDialogOptions = {
            controllerAs: 'vm',
            //locals: {
            //    action: 'Edit ' + vm.positionDetail.data.name,
            //    userDisplayName: CurrentUser.data.firstName + ' ' + CurrentUser.data.lastName,
            //    position: angular.copy(vm.positionDetail.data)
            //},
            bindToController: true,
            //templateUrl: 'views/add-position-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
        };

        vm.clientId = $stateParams.clientId;

        vm.positionDetail = positionDetail;

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
            var dialogOptions = $.extend({}, genericDialogOptions, {
                templateUrl: 'views/add-position-dialog.html',
                locals: {
                    action: 'Edit ' + vm.positionDetail.data.name,
                    position: angular.copy(vm.positionDetail.data)
                },
                controller: 'AddPositionDialogCtrl',
                targetEvent: ev
            });

            var dialogPromise = $mdDialog.show(dialogOptions);

            dialogPromise.then(function(position) {
                vm.positionDetail.save(position).catch(function() {
                    alert('An error occured while saving your changes');
                });
            });
        }

        function addCandidate(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var dialogOptions = $.extend({}, genericDialogOptions, {
                templateUrl: 'views/candidate-dialog.html',
                locals: {
                    action: 'Add a Candidate for ' + vm.positionDetail.data.name,
                    userDisplayName: CurrentUser.data.firstName + ' ' + CurrentUser.data.lastName
                },
                controller: 'CandidateDialogCtrl',
                targetEvent: ev
            });

            var dialogPromise = $mdDialog.show(dialogOptions);

            dialogPromise.then(function(position) {
                //vm.positionDetail.save(position).catch(function() {
                //    alert('An error occured while saving your changes');
                //});
            });
        }

        function addNote() {

        }

        function addFile() {

        }

        function editNote(note) {

        }
    }

})();
