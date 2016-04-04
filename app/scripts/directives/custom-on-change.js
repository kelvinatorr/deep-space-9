(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name deepspace9App.directive:customOnChange
     * @description
     * # customOnChange
     */
    angular.module('deepspace9App')
        .directive('customOnChange', customOnChange);

    function customOnChange() {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.bind('change',function() {
                    scope.vm.uploadFileWatcher(element.val());
                });
            }
        };
    }
})();
