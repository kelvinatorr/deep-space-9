'use strict';

describe('Controller: UserDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('deepspace9App'));

  var UserDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDialogCtrl = $controller('UserDialogCtrl', {
      //$scope: scope
    });
  }));

  //it('should attach a list of awesomeThings to the scope', function () {
  //  expect(scope.awesomeThings.length).toBe(3);
  //});
});
