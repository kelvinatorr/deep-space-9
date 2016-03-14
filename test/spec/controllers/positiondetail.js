'use strict';

describe('Controller: PositionDetailCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var PositionDetailCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PositionDetailCtrl = $controller('PositionDetailCtrl', {
        });
    }));


});
