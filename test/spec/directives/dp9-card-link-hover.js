'use strict';

describe('Directive: dp9CardLinkHover', function () {

    // load the directive's module
    beforeEach(module('deepspace9App'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should add the md-whiteframe-9dp class to an element on mouseover', inject(function ($compile) {
        element = angular.element('<button dp9-card-link-hover></button>');
        element = $compile(element)(scope);
        element.trigger('mouseover');
        expect(element.hasClass('md-whiteframe-9dp')).toBe(true);
    }));

    it('should remove the md-whiteframe-9dp class to an element on mouseout', inject(function ($compile) {
        element = angular.element('<button dp9-card-link-hover></button>');
        element = $compile(element)(scope);
        element.trigger('mouseover');
        element.trigger('mouseout');
        expect(element.hasClass('md-whiteframe-9dp')).toBe(false);
    }));
});
