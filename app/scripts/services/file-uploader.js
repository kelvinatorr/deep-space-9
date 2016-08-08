(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.FileUploader
     * @description
     * # fileUploader
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('FileUploader', FileUploader);

    function FileUploader($http, $q) {
        var endPoint = 'https://deepspace9-1134.appspot.com/gcs';

        return {
            upload: upload,
            deleteFile: deleteFile
        };

        function upload(files, folderName, fileModel) {
            var data = new FormData();
            $.each(files, function(i, file) {
                data.append('file_input', file);
            });
            data.append('folderName', folderName);
            data.append('userName', fileModel.userName);
            data.append('userId', fileModel.userId);
            return $http.post(endPoint, data, { headers:
            { 'Content-Type': undefined }, transformRequest: angular.identity });
        }

        function deleteFile(fileModel, userId) {
            return $q(function(resolve, reject) {
                $http.delete(endPoint + '?fileId=' + fileModel.ndbId, {headers: {'Firebase-User-Id': userId}}).success(function() {
                    resolve();
                }).error(reject);
            });


        }
    }
})();
