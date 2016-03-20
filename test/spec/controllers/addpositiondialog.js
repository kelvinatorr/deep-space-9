'use strict';

describe('Controller: AddPositionDialogCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var AddPositionDialogCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AddPositionDialogCtrl = $controller('AddPositionDialogCtrl', {
            $scope: scope
        });
    }));

    //it('should attach a list of awesomeThings to the scope', function () {
    //  expect(scope.awesomeThings.length).toBe(3);
    //});
});
