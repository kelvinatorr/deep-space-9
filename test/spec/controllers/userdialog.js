'use strict';

describe('Controller: UserDialogCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var UserDialogCtrl,
        scope;

    var $mdDialog = {
        hide: function() {},
        cancel: function() {}
    };

    var mockClickEvent = {
        preventDefault: function() {},
        stopPropagation: function() {}
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn($mdDialog, 'hide');
        spyOn($mdDialog, 'cancel');
        UserDialogCtrl = $controller('UserDialogCtrl', {
            $mdDialog: $mdDialog
        });
    }));

    it('should call hide when save is called', function () {
        var user = 123;
        UserDialogCtrl.save(user);
        expect($mdDialog.hide).toHaveBeenCalledWith(user);
    });

    it('should call cancel when cancel is called', function () {
        UserDialogCtrl.cancel(mockClickEvent);
        expect($mdDialog.cancel).toHaveBeenCalled();
    });
});
