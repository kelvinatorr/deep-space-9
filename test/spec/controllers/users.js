'use strict';

describe('Controller: UsersCtrl', function () {

    // load the controller's module
    beforeEach(module('deepspace9App'));


    var UsersCtrl,
        scope;

    var users = {
        getUsers: function() {

        },
        data: {
            $watch: function() {

            }
        },
        reSyncTableData: function() {
            return true;
        },
        createUser: function() {
            return {'catch': function() { return 'Error'}}
        },
        deleteUser: function() {
            return {'catch': function() { return 'Error'}}
        }
    };

    var initQuery = {
        order: 'lastName',
        limit: 5,
        page: 1
    };

    var deferred;

    var $mdDialog = {};

    var dialogDeferred;

    var mockClickEvent = {
        preventDefault: function() {},
        stopPropagation: function() {}
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        var promise = deferred.promise;
        //var resolvedValue;
        users.getUsers = function() {
            return promise;
        };

        //promise.then(function(value) { resolvedValue = value; });
        //expect(resolvedValue).toBeUndefined();

        // Simulate resolving of promise
        //deferred.resolve(123);

        dialogDeferred = $q.defer();
        var dialogDeferredPromise = dialogDeferred.promise;
        //dialogDeferredPromise.then(function(value) { console.log('is this being called?')});
        $mdDialog.show = function() {
            //console.log(dialogDeferredPromise);
            return dialogDeferredPromise;
        };

        spyOn($mdDialog, 'show').and.callThrough();

        spyOn(users, 'createUser').and.callThrough();

        spyOn(users, 'deleteUser').and.callThrough();

        // sublist in the sidenav
        var subList = document.createElement('ul');
        subList.id = 'testSubList';
        document.body.appendChild(subList);

        UsersCtrl = $controller('UsersCtrl', {
            initQuery: initQuery,
            users: users,
            $mdDialog: $mdDialog
        });
    }));

    it('should set vm.query.page to the page argument onPaginate', function () {
        UsersCtrl.onPaginate(5,10);
        //deferred.resolve();
        expect(UsersCtrl.query.page).toBe(5);
    });

    it('should set vm.query.limit to the limit argument onPaginate', function () {
        UsersCtrl.onPaginate(5,10);
        //deferred.resolve();
        expect(UsersCtrl.query.limit).toBe(10);
    });

    it('should set vm.query.order to the order argument onReorder', function () {
        UsersCtrl.onReorder(11);
        //deferred.resolve();
        expect(UsersCtrl.query.order).toBe(11);
    });

    it('should call $mdDialog show when addUser is called', function() {
        UsersCtrl.addUser(mockClickEvent);
        //dialogDeferred.resolve();
        expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should call users.createUser when the dialog promise is resolved', function() {
        UsersCtrl.addUser(mockClickEvent);
        var formModel = {hello: 'world'};
        dialogDeferred.resolve(formModel);
        scope.$apply();
        expect(users.createUser).toHaveBeenCalledWith(formModel);
    });

    it('should call users.deleteUser deleteUser is called', function() {
        UsersCtrl.deleteUser();
        expect(users.deleteUser).toHaveBeenCalled();
    });
});
