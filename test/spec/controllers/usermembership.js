'use strict';

describe('Controller: UserMembershipCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var UserMembershipCtrl,
        scope;

    var mockFirebaseRef = {
        ref: {
            child: function(arg) {}
        }
    };

    var mockfirebaseObject = function() {

    };

    var mockUsers = {
        data: [{$id: 111}]
    };

    var mockClients = {
        data: [{$id: 'ufps'}, {$id: 'houseLannister'}, {$id: 'whiteHouse'}, {$id: 'ibm'}]
    };

    var timeout;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $timeout) {
        timeout = $timeout;
        scope = $rootScope.$new();
        UserMembershipCtrl = $controller('UserMembershipCtrl', {
            users: mockUsers,
            clients: mockClients,
            FirebaseRef: mockFirebaseRef,
            $firebaseObject: mockfirebaseObject,
            $timeout: timeout
        });

        spyOn(mockFirebaseRef.ref, 'child');
    }));

    describe('selectUser', function() {
        var testUser = {
            $id: 123
        };
        it('should set the selected user correctly', function() {

            UserMembershipCtrl.selectUser(testUser);
            expect(UserMembershipCtrl.selectedUser).toBe(testUser);
        });

        it('should call FirebaseRef child', function() {
            UserMembershipCtrl.selectUser(testUser);
            expect(mockFirebaseRef.ref.child).toHaveBeenCalled();
        });
    });

    describe('addMembership', function() {
        beforeEach(function() {
            UserMembershipCtrl.selectedUserMembership = {
                ufps: true,
                houseLannister: false,
                whiteHouse: true,
                ibm: false,
                $save: function() {
                    return {
                        catch: function() {}
                    }
                }
            };
            spyOn(UserMembershipCtrl.selectedUserMembership, '$save').and.callThrough();
            UserMembershipCtrl.addMembership();
            timeout.flush();
        });

        it('should remove all ids in clients that are set to false', function() {
            expect(UserMembershipCtrl.selectedUserMembership.houseLannister).toBeUndefined();
            expect(UserMembershipCtrl.selectedUserMembership.ibm).toBeUndefined();
            expect(UserMembershipCtrl.selectedUserMembership.ufps).toBeDefined();
        });

        it('should call $save', function() {
            expect(UserMembershipCtrl.selectedUserMembership.$save).toHaveBeenCalled();
        });


    });




});
