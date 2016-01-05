(function() {


    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:UsersCtrl
     * @description
     * # UsersCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('UsersCtrl', UsersCtrl);

    function UsersCtrl($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }

})();
