(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.CurrentUser
     * @description
     * # CurrentUser
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('CurrentUser', CurrentUser);

    function CurrentUser(FirebaseRef, $q, $firebaseObject) {

        // Public API here
        return {
            data: {},
            getCurrentUser: getCurrentUser,
            logout: logout,
            getMembership: getMembership
        };

        /**
         * Get which clients the current user is a member of
         * @param uid
         * @returns {*}
         */
        function getMembership(uid) {
            return $q(function(resolve, reject) {
                var membership = $firebaseObject(FirebaseRef.ref.child('userMembership/' + uid));
                membership.$loaded().then(function() {
                    resolve(membership);
                }).catch(function(response) {
                    console.log(response);
                    reject();
                });
            });
        }

        function getCurrentUser() {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                var authData = FirebaseRef.ref.getAuth();
                if (authData) {
                    self.data = $firebaseObject(FirebaseRef.ref.child('users/' + authData.uid));
                    self.data.$loaded().then(function(){
                        resolve(self);
                    }).catch(function() {
                        reject();
                    });
                } else {
                    reject();
                }

            });
        }

        function logout() {
            FirebaseRef.ref.unauth();
        }
    }
})();

