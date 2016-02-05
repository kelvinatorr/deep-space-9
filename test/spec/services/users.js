'use strict';

describe('Service: Users', function () {

    // load the service's module
    beforeEach(module('deepspace9App'));

    // instantiate service
    var Users;

    var firebaseMethods = {
        update: function() {},
        orderByChild: function() {}
    };

    var mockRef = {
        child: function() {
            return firebaseMethods;
        },
        createUser: function() {}
    };

    var deferred;

    var rootScope;

    var usersResult = [{name: 'Kelvin'}];

    beforeEach(module(function($provide) {
        $provide.value('FirebaseRef', {
            ref: mockRef
        });

        $provide.factory('$firebaseArray', function($q, $firebaseUtils) {
            deferred = $q.defer();
            var promise = deferred.promise;

            //var obj = {
            //
            //};

            function firebaseArray() {
                if( !(this instanceof firebaseArray) ) {
                    return new firebaseArray();
                }
                //return obj;
                var self = this;
                //this._observers = [];
                this.$list = [];
                //console.log($firebaseUtils);
                $firebaseUtils.getPublicMethods(self, function(fn, key) {
                    self.$list[key] = fn.bind(self);
                });

                this.$list.push.apply(this.$list, usersResult);
                return this.$list;
            }

            firebaseArray.prototype = {
                $loaded: function() {
                    return promise.then(function(data) {
                        //obj = data;
                        return data;
                    });
                }
            };
            return firebaseArray;
        });
    }));

    beforeEach(inject(function (_Users_, _$rootScope_) {
        rootScope =  _$rootScope_;
        // add jasmine spies
        spyOn(firebaseMethods, 'update');
        spyOn(mockRef, 'createUser');
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

    it('should call firebase createUser on ref on createUser', function () {
        var newUser = {
            lastName: 'Boom',
            temporaryPassword: 'headshot',
            email: 'boom@example.com'
        };
        Users.createUser(newUser);
        expect(mockRef.createUser).toHaveBeenCalled();
    });

    it('should set total users property to 1', function() {
        var query = {
            order: 'lastName',
            limit: 5,
            page: 1
        };

        Users.getUsers(query);
        deferred.resolve(usersResult);
        rootScope.$apply();
        expect(Users.totalUsers).toBe(usersResult.length);
    })

});
