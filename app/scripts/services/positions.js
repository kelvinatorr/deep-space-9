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
            var newPositionKey = newPosition.name.toLowerCase().replace(/\s/g, '');
            var clientsSaveObject = {
                name : newPosition.name,
                priority: newPosition.priority
            };
            //console.log(clientsSaveObject);
            return $q(function(resolve, reject) {
                // save to positions
                FirebaseRef.ref.child('positions/' + clientId + '/' + newPositionKey).set(newPosition, function(error) {
                    if (error) {
                        reject(error);
                    } else {
                        // save to clients
                        FirebaseRef.ref.child('clients/' + clientId + '/positions/' + newPositionKey).set(clientsSaveObject,
                            function(clientsError) {
                                if(clientsError) {
                                    reject(clientsError);
                                } else {
                                    resolve();
                                }
                            });
                    }
                });
            });
        }
    }

})();
