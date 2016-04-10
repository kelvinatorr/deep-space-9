(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.Candidate
     * @description
     * # Candidate
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('Candidate', Candidate);

    function Candidate(FirebaseRef, $firebaseObject, $q) {

        // Public API here
        return {
            data: [],
            getData: getData,
            saveNew: saveNew,
            getTemplate: getTemplate
        };

        function getData() {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {

            });
        }

        function saveNew(clientId, newCandidateKeyData) {
            return $q(function(resolve, reject) {
                FirebaseRef.ref.child('candidates/' + clientId + '/' + newCandidateKeyData.key).set(newCandidateKeyData.data, function(candidateError) {
                    if(!candidateError) {
                        resolve();
                    } else {
                        reject(candidateError);
                    }
                });
            });
        }

        function getTemplate() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                averageRating: null
            };
        }
    }
})();
