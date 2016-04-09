(function() {
    'use strict';

    /**
     * @ngdoc factory
     * @name deepspace9App.positionDetail
     * @description
     * # positionDetail
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('PositionDetail', PositionDetail);

    function PositionDetail(FirebaseRef, $firebaseObject, $q, CurrentUser) {

        return  {
            data: {},
            getData: getData,
            save: save,
            getFileTemplate: getFileTemplate,
            addFile: addFile,
            removeFile: removeFile
        };

        function getData(clientId, positionId) {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                self.data = $firebaseObject(FirebaseRef.ref.child('positions/' + clientId + '/' + positionId));
                self.data.$loaded().then(function() {
                    resolve(self);
                }).catch(function(response) {
                    reject(response);
                });
            });
        }

        function save(newData) {
            /*jshint validthis: true */
            var self = this;
            angular.forEach(self.data, function(val, key) {
                self.data[key] = newData[key];
            });
            return self.data.$save();
        }

        function addFile(clientId, positionId, newFileModel) {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                var filesRef = FirebaseRef.ref.child('positions/' + clientId + '/' + positionId + '/files');
                filesRef.push().set(newFileModel, function(error) {
                    if(error) {
                        reject();
                    } else {
                        resolve();
                        var updateText = CurrentUser.data.firstName + ' ' +  CurrentUser.data.lastName + ' added file ' + newFileModel.fileName;
                        _updateLatestUpdate.call(self, updateText);
                    }
                });
            });
        }

        function removeFile(clientId, positionId, fileKey, file) {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                //console.log(fileModel);
                var filesRef = FirebaseRef.ref.child('positions/' + clientId + '/' + positionId + '/files/' + fileKey);
                filesRef.set(null, function(error) {
                    if(error) {
                        reject();
                    } else {
                        resolve();
                        var updateText = CurrentUser.data.firstName + ' ' +  CurrentUser.data.lastName + ' deleted ' + file.fileName;
                        _updateLatestUpdate.call(self, updateText);
                    }
                });
            });
        }

        /**
         * Returns the firebase file model
         * @returns {{fileName: string, userName: string, userId: *, uploadTimeStamp: null, ndbId: string}}
         */
        function getFileTemplate() {
            return {
                fileName: '',
                userName: CurrentUser.data.firstName + ' ' +  CurrentUser.data.lastName,
                userId: CurrentUser.data.$id,
                uploadTimeStamp: null,
                ndbId: ''
            };
        }

        function _updateLatestUpdate(text) {
            var now = new Date();
            /*jshint validthis: true */
            var self = this;
            self.data.latestUpdate = text + ',';
            self.data.latestUpdateDateTime = now.toISOString();
            self.data.$save();
        }
    }

})();
