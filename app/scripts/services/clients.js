(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.Clients
     * @description
     * # Clients
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('Clients', Clients);

    function Clients(FirebaseRef, $firebaseObject, $q, CurrentUser) {

        var ref = FirebaseRef.ref;

        // Public API here
        return {
            data: [],
            getData: getData,
            getClient: getClient
        };

        function getData(uid) {
            /*jshint validthis: true */
            var self = this;
            self.data = [];
            return $q(function(resolve, reject) {
                CurrentUser.getMembership(uid).then(function(membership) {
                    angular.forEach(membership, function(val, key) {
                        var client = $firebaseObject(ref.child('clients/' + key));
                        self.data.push(client);
                    });
                    resolve(self);
                }).catch(function(response) {
                    reject(response);
                });
            });
        }

        function getClient(clientId) {
            return $q(function(resolve, reject) {
                var client = $firebaseObject(ref.child('clients/' + clientId));
                client.$loaded().then(function() {
                    resolve(client);
                }).catch(function(response) {
                    reject(response);
                });
            });
        }
    }
})();

