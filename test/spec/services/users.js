'use strict';

describe('Service: Users', function () {

    // load the service's module
    beforeEach(module('deepspace9App'));

    // instantiate service
    var Users;

    var firebaseMethods = {
        update: function() {}
    };

    var mockRef = {
        child: function() {
            return firebaseMethods;
        }
    };

    beforeEach(module(function($provide) {
        $provide.value('FirebaseRef', {
            ref: mockRef
        });
    }));
    beforeEach(inject(function (_Users_) {
        // add jasmine spies
        spyOn(firebaseMethods, 'update');
        Users = _Users_;
    }));

    it('should do something', function () {
        expect(!!Users).toBe(true);
        //console.log(Users);
    });

    it('should call firebase update on deleteUser', function () {
        var deleteList = [
            {$id: 1},
            {$id: 2}
        ];
        Users.deleteUser(deleteList);
        expect(firebaseMethods.update).toHaveBeenCalled();
    });

});
