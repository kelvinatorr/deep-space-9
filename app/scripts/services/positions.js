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
            getData: getData
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
    }

})();
