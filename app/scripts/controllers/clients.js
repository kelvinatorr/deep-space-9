(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:ClientsCtrl
     * @description
     * # ClientsCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('ClientsCtrl', ClientsCtrl);

    function ClientsCtrl(clients, currentUser) {
        var vm = this;

        vm.clients =  clients;

        vm.currentUser = currentUser.data;

    }

})();
