'use strict';

describe('Controller: NotesDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('deepspace9App'));

  var NotesDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotesDialogCtrl = $controller('NotesDialogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
