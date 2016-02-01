(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.firebase
     * @description
     * # firebase
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('FirebaseRef', FirebaseRef);

    function FirebaseRef(APIEndpoint) {

        // Public API here
        return {
            ref: new Firebase(APIEndpoint)
        };
    }
})();

