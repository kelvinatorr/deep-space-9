'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
        });
    }));

});
