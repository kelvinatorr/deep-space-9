(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:NotesDialogCtrl
     * @description
     * # NotesDialogCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('NotesDialogCtrl', NotesDialogCtrl);

    function NotesDialogCtrl($mdDialog, CurrentUser) {
        var vm  = this;

        vm.noteForm = {};

        vm.note = {
            text: '',
            timeStamp: '',
            user: CurrentUser.data.firstName + ' ' +  CurrentUser.data.lastName,
            userId: CurrentUser.data.$id
        };

        vm.cancel = cancel;

        vm.save = save;

        function cancel(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $mdDialog.cancel();
        }

        function save(note) {
            var currentDate = new Date();
            note.timeStamp = currentDate.toJSON();
            $mdDialog.hide(note);
        }
    }
})();
