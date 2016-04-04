'use strict';

describe('Controller: CandidateDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('deepspace9App'));

  var CandidateDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
      CandidateDialogCtrl = $controller('CandidateDialogCtrl', {
    });
  }));


});
