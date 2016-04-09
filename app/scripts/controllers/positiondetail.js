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

    function PositionDetailCtrl(positionDetail, $stateParams, $mdDialog, $mdMedia, CurrentUser, Candidate, $http, FileUploader) {
        var vm = this;

        var genericDialogOptions = {
            controllerAs: 'vm',
            bindToController: true,
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

        vm.deleteFile = deleteFile;

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
                    userDisplayName: CurrentUser.data.firstName + ' ' + CurrentUser.data.lastName,
                    candidate: Candidate.getTemplate()
                },
                controller: 'CandidateDialogCtrl',
                targetEvent: ev
            });

            var dialogPromise = $mdDialog.show(dialogOptions);

            dialogPromise.then(function(newCandidate) {
                Candidate.saveNew(vm.clientId, vm.positionDetail.data.$id, newCandidate);
            });
        }

        function addNote(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var dialogOptions = $.extend({}, genericDialogOptions, {
                templateUrl: 'views/notes-dialog.html',
                locals: {
                    action: 'Add a Note'
                },
                controller: 'NotesDialogCtrl',
                targetEvent: ev
            });

            $mdDialog.show(dialogOptions).then(function(newNote) {
                console.log(newNote);
            });
        }

        function addFile(ev) {
            //show modal
            ev.preventDefault();
            ev.stopPropagation();
            var dialogOptions = $.extend({}, genericDialogOptions, {
                templateUrl: 'views/file-dialog.html',
                locals: {
                    action: 'Add a File',
                    fileModel: vm.positionDetail.getFileTemplate(),
                    folderName: 'positions/' + vm.clientId + '/' + vm.positionDetail.data.$id
                },
                controller: 'FileDialogCtrl',
                targetEvent: ev
            });
            // Set this to false so that they cannot dismiss the dialog when the spinner is running
            dialogOptions.clickOutsideToClose = false;
            $mdDialog.show(dialogOptions).then(function(newFileModel) {
                // save to firebase
                vm.positionDetail.addFile($stateParams.clientId, vm.positionDetail.data.$id, newFileModel);
            });

        }

        function deleteFile(ev, key, file) {
            ev.preventDefault();
            ev.stopPropagation();
            // show confirmation dialog
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete ' + file.fileName + '?')
                .textContent('This action is permanent.')
                .ariaLabel('Confirm delete ' + file.fileName)
                .targetEvent(ev)
                .ok('Yes, delete it')
                .cancel('No, take me back');
            $mdDialog.show(confirm).then(function() {
                // make api call to app engine
                FileUploader.deleteFile(file, CurrentUser.data.$id).then(function() {
                    // delete it from firebase
                    return vm.positionDetail.removeFile($stateParams.clientId, vm.positionDetail.data.$id, key, file);
                }).catch(function() {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('An Error Occurred')
                            .textContent('There was a problem deleting ' +  file.fileName + '.')
                            .ariaLabel('There was a problem deleting ' +  file.fileName + '.')
                            .ok('Okay')
                            .targetEvent(ev)
                    );
                });
            });
        }

        function editNote(note) {

        }


    }

})();
