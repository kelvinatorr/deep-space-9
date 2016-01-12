(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.Users
     * @description
     * # Users
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('Users', Users);

    function Users(APIEndpoint, $firebaseArray, $q) {

        var fire = new Firebase(APIEndpoint).child('users');

        // Public API here
        return {
            data: [],
            getUsers: getUsers
        };

        function getUsers(query) {
            /*jshint validthis: true */
            var self = this;
            var ref = fire.orderByChild(query.order).limitToLast(query.limit);
            return $q(function(resolve, reject) {
                $firebaseArray(ref).$loaded().then(function(data) {
                    self.data = data;
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

