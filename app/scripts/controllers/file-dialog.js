(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:FileDialogCtrl
     * @description
     * # FileDialogCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('FileDialogCtrl', FileDialogCtrl);

    function FileDialogCtrl($mdDialog, $timeout, FileUploader) {
        var vm  = this;

        vm.fileDisplay = '';

        vm.fileForm = {};

        vm.browseFile = browseFile;

        vm.uploadFileWatcher = uploadFileWatcher;

        vm.cancel = cancel;

        vm.save = save;

        vm.isUploading = false;

        function browseFile() {
            document.getElementById('uploadFile').click();
        }

        function uploadFileWatcher(val) {
            $timeout(function(){
                var idx = val.lastIndexOf('\\') + 1;
                vm.fileModel.fileName = val;
                vm.fileDisplay = val.substr(idx);
                checkFile();
            });
        }

        function cancel(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        }

        function save(fileModel) {
            if(checkFile()) {
                var files = document.getElementById('uploadFile').files;
                // show spinner
                vm.isUploading = true;
                // upload to cloud
                FileUploader.upload(files, vm.folderName, fileModel).then(function(response) {
                    // add timestamp
                    var currentDate = new Date();
                    fileModel.uploadTimeStamp = currentDate.toJSON();
                    console.log(response.data);
                    console.log('Success!');
                    // close and save to firebase
                    //$mdDialog.hide(file);
                }).catch(function() {
                    alert('An error occurred while uploading the file');
                    vm.isUploading = false;
                });
            }
        }

        function checkFile() {
            vm.fileForm.fileDisplay.$dirty = true;
            var files = document.getElementById('uploadFile').files;
            if(files.length === 0) {
                // show error message
                vm.fileForm.fileDisplay.$setValidity('fileSelected', false);
                return false;
            } else {
                vm.fileForm.fileDisplay.$setValidity('fileSelected', true);
                // check that it is less than 32MB
                if(files[0].size > 31999999) {
                    vm.fileForm.fileDisplay.$setValidity('fileSize', false);
                    return false;
                } else {
                    vm.fileForm.fileDisplay.$setValidity('fileSize', true);
                    return true;
                }
            }
        }
    }
})();
