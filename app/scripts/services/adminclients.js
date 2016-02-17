(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.adminclients
     * @description
     * # adminclients
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('AdminClients', AdminClients);

    function AdminClients(FirebaseRef, $firebaseArray, $q) {

        var ref = FirebaseRef.ref;

        // Public API here
        return {
            data: [],
            getData: getData
        };

        function getData() {
            /*jshint validthis: true */
            var self = this;
            self.data = [];
            return $q(function(resolve, reject) {
                self.data = $firebaseArray(ref.child('clients'));
                self.data.$loaded().then(function() {
                    resolve(self);
                }).catch(function(response) {
                    console.log('rejected!');
                    console.log(response);
                    reject();
                });
            });
        }
    }
})();

