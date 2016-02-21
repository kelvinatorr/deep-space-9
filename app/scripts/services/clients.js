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

    function Clients() {

        // Public API here
        return {
            data: [],
            getData: getData
        };

        function getData() {
            
        }
    }
})();

