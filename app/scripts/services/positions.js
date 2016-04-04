(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.positions
     * @description
     * # positions
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('Positions', Positions);

    function Positions(FirebaseRef, $firebaseArray, $q) {

        // Public API here
        return {
            data: [],
            getData: getData,
            createPosition: createPosition
        };

        function getData(clientId) {
            /*jshint validthis: true */
            var self = this;
            self.data = [];
            return $q(function(resolve, reject) {
                self.data = $firebaseArray(FirebaseRef.ref.child('positions/' + clientId));
                self.data.$loaded().then(function() {
                    resolve(self);
                }).catch(function(response) {
                    reject(response);
                });
            });
        }

        function createPosition(newPosition, clientId) {
            /*jshint validthis: true */
            var self = this;
            var clientsSaveObject = {
                name : newPosition.name,
                priority: newPosition.priority
            };
            return $q(function(resolve, reject) {
                // save to positions
                self.data.$add(newPosition).then(function(ref) {
                    // save to clients
                    FirebaseRef.ref.child('clients/' + clientId + '/positions/' + ref.key()).set(clientsSaveObject,
                        function(clientsError) {
                            if(clientsError) {
                                reject(clientsError);
                            } else {
                                resolve();
                            }
                        });
                }).catch(function(error) {
                    reject(error);
                });
            });
        }
    }

})();
