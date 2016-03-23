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

    function PositionDetailCtrl(positionDetail, $stateParams) {
        var vm = this;

        vm.clientId = $stateParams.clientId;

        vm.positionDetail = positionDetail;
        console.log(vm.positionDetail);
        //console.log($stateParams);

        vm.edit = edit;

        vm.addCandidate = addCandidate;

        vm.addNote = addNote;

        vm.addFile = addFile;

        vm.editNote = editNote;

        /**
         * Edit the name, description, or priority of the position
         */
        function edit() {

        }

        function addCandidate() {

        }

        function addNote() {

        }

        function addFile() {

        }

        function editNote(note) {

        }
    }

})();
