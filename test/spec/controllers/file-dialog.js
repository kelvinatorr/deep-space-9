'use strict';

describe('Controller: FileDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('deepspace9App'));

  var FileDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileDialogCtrl = $controller('FileDialogCtrl', {
      $scope: scope
    });
  }));

});
