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
            removeFile: removeFile,
            addNote: addNote,
            addCandidate: addCandidate
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

        function addNote(clientId, positionId, newNote) {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                var filesRef = FirebaseRef.ref.child('positions/' + clientId + '/' + positionId + '/notes');
                filesRef.push().set(newNote, function(error) {
                    if(error) {
                        reject();
                    } else {
                        resolve();
                        var updateText = CurrentUser.data.firstName + ' ' +  CurrentUser.data.lastName + ' added a new note';
                        _updateLatestUpdate.call(self, updateText);
                    }
                });
            });
        }

        /**
         * Adds a new candidate to the position details data tree
         * @param clientId
         * @param positionId
         * @param newCandidate
         * @returns a promise
         */
        function addCandidate(clientId, positionId, newCandidate) {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                var newCandidateRef = FirebaseRef.ref.child('positions/' + clientId + '/' + positionId + '/candidates/').push();
                newCandidateRef.set(newCandidate, function(error) {
                    if(!error) {
                        // update latest update
                        var updateText = CurrentUser.data.firstName + ' ' +  CurrentUser.data.lastName + ' added candidate ' +
                            newCandidate.firstName + ' ' + newCandidate.lastName;
                        _updateLatestUpdate.call(self, updateText);
                        // we resolve the key and data so we can write the same key to the candidates tree.
                        resolve({
                            key : newCandidateRef.key(),
                            data: newCandidate
                        });
                    } else {
                        reject(error);
                    }
                });
            });

        }

        function _updateLatestUpdate(text) {
            var now = new Date();
            /*jshint validthis: true */
            var self = this;
            self.data.latestUpdate = text + ' - ';
            self.data.latestUpdateDateTime = now.toISOString();
            self.data.$save();
        }
    }

})();
