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

    function Clients(FirebaseRef, $firebaseObject, $q) {

        var ref = FirebaseRef.ref;

        // Public API here
        return {
            data: [],
            //positions: [],
            getData: getData
        };

        function getData(uid) {
            /*jshint validthis: true */
            var self = this;
            self.data = [];
            return $q(function(resolve, reject) {
                var membership = $firebaseObject(ref.child('userMembership/' + uid));
                membership.$loaded().then(function() {
                    // get the client names
                    angular.forEach(membership, function(val, key) {
                        var client = $firebaseObject(ref.child('clients/' + key));
                        self.data.push(client);
                    });
                    resolve(self);
                }).catch(function(response) {
                    console.log(response);
                    reject();
                });
            });
        }
    }
})();

