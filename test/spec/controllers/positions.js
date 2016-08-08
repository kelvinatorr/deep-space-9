'use strict';

describe('Controller: PositionsCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var PositionsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PositionsCtrl = $controller('PositionsCtrl', {
        });
    }));

});
