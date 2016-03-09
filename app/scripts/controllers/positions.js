(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:PositionsCtrl
     * @description
     * # PositionsCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('PositionsCtrl', PositionsCtrl);

    function PositionsCtrl(positions, client) {
        var vm = this;

        vm.positions = positions;

        vm.client = client;

    }
})();

