(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:CandidateDialogCtrl
     * @description
     * # CandidateDialogCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('CandidateDialogCtrl', CandidateDialogCtrl);

    function CandidateDialogCtrl($mdDialog) {
        var vm  = this;

        //vm.candidateForm = {};

        vm.cancel = cancel;

        vm.save = save;

        function cancel(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        }

        function save(candidate) {
            //var currentDate = new Date();
            //position.latestUpdateDateTime = currentDate.toJSON();
            $mdDialog.hide(candidate);
        }
    }

})();
