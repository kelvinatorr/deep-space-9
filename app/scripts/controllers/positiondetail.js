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

    function PositionDetailCtrl(positionDetail, $stateParams, $mdDialog, $mdMedia, CurrentUser, Candidate, $http) {
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

        vm.editNote = editNote;

        vm.testDelete = function() {
            var fileId = '5741031244955648';
            $http.delete('https://deepspace9-1134.appspot.com//gcs?fileId=' + fileId, {headers: {'Firebase-User-Id': 'cb516b90-7a3f-4f76-aed7-236fac453bf2'}}).success(function() {
                console.log('delete success!');
            });
        };

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
                    folderName: vm.clientId + '/' + vm.positionDetail.data.$id
                },
                controller: 'FileDialogCtrl',
                targetEvent: ev
            });
            dialogOptions.clickOutsideToClose = false;
            $mdDialog.show(dialogOptions).then(function(newFile) {
                // save to firebase
                console.log(newFile);
            });

        }

        function editNote(note) {

        }
    }

})();
