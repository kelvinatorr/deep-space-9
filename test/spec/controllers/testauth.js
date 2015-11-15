'use strict';

describe('Controller: TestauthCtrl', function () {

  // load the controller's module
  beforeEach(module('deepspace9App'));

  var TestauthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestauthCtrl = $controller('TestauthCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
