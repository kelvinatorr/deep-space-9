'use strict';

describe('Controller: UserMembershipCtrl', function () {

  // load the controller's module
  beforeEach(module('deepspace9App'));

  var UserMembershipCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
      UserMembershipCtrl = $controller('UserMembershipCtrl', {
    });
  }));

});
