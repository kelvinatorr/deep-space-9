(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:PositionDetailCtrl
     * @description
     * # PositionDetailCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('PositionDetailCtrl', PositionDetailCtrl);

    function PositionDetailCtrl(positionDetail) {
        var vm = this;

        vm.positionDetail = positionDetail;
        console.log(vm.positionDetail);
    }

})();
