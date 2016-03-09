(function() {

    'use strict';

    /**
     * @ngdoc directive
     * @name deepspace9App.directive:dp9CardLinkHover
     * @description
     * # dp9CardLinkHover
     */
    angular.module('deepspace9App')
        .directive('dp9CardLinkHover', dp9CardLinkHover);

    function dp9CardLinkHover() {
        return {
            restrict: 'A',
            link: postLink
        };

        function postLink(scope, element) {
            //elemen
            element.on('mouseover', function() {
                //element.removeClass('md-whiteframe-3dp');
                element.addClass('md-whiteframe-9dp');
            });

            element.on('mouseleave', function() {
                element.removeClass('md-whiteframe-9dp');
                //element.addClass('md-whiteframe-3dp');
            });
        }
    }
})();

