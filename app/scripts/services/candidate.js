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

        function saveNew(clientId, positionId, newCandidate) {
            return $q(function(resolve, reject) {
                var newCandidateRef = FirebaseRef.ref.child('positions/' + clientId + '/' + positionId + '/candidates/').push();
                newCandidateRef.set(newCandidate, function(error) {
                    if(!error) {
                        FirebaseRef.ref.child('candidates/' + clientId + '/' + newCandidateRef.key()).set(newCandidate, function(candidateError) {
                            if(!candidateError) {
                                resolve();
                            } else {
                                reject(candidateError);
                            }
                        });
                    } else {
                        reject(error);
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
