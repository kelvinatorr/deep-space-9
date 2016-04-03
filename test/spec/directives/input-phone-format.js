'use strict';

describe('Directive: phoneFormat', function () {

    // load the directive's module
    beforeEach(module('deepspace9App'));

    //var element
    var scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    //it('should make hidden element visible', inject(function ($compile) {
    //  element = angular.element('<phone-format></phone-format>');
    //  element = $compile(element)(scope);
    //  expect(element.text()).toBe('this is the phoneFormat directive');
    //}));
});
