/* jshint ignore:start */
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

        $provide.factory('$firebaseArray', function($q) {
            deferred = $q.defer();
            var promise = deferred.promise;

            function $loaded() {
                return promise;
            }

            function firebaseArray() {
                if( !(this instanceof firebaseArray) ) {
                    return new firebaseArray();
                }

                //var self = this;
                //this._observers = [];
                this.$list = [];
                //console.log($firebaseUtils);
                //$firebaseUtils.getPublicMethods(self, function(fn, key) {
                //    self.$list[key] = fn.bind(self);
                //});

                this.$list.$loaded = $loaded.bind(this);

                this.$list.push.apply(this.$list, usersResult);
                return this.$list;
            }

            //firebaseArray.prototype = {
            //    $loaded: function() {
            //        return promise;
            //    }
            //};
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

    describe('deleteUser', function() {
        it('should call firebase update on deleteUser', function () {
            var deleteList = [
                {$id: 1},
                {$id: 2}
            ];
            Users.deleteUser(deleteList);
            expect(firebaseMethods.update).toHaveBeenCalled();
        });

        it('should return a promise', function() {
            var deleteList = [
                {$id: 1},
                {$id: 2}
            ];
            var result = Users.deleteUser(deleteList);
            expect('then' in result).toBe(true);
        });

    });


    describe('createUser', function(){
        it('should call firebase createUser', function () {
            var newUser = {
                lastName: 'Boom',
                temporaryPassword: 'headshot',
                email: 'boom@example.com'
            };
            Users.createUser(newUser);
            expect(mockRef.createUser).toHaveBeenCalled();
        });
    });



    describe('getUsers', function() {

        var query = {
            order: 'lastName',
            limit: 5,
            page: 1
        };


        it('should set total users property to the length of usersResult', function() {
            Users.getUsers(query);
            deferred.resolve(usersResult);
            rootScope.$apply();
            expect(Users.totalUsers).toBe(usersResult.length);
        });

        it('should set table data to be usersResult', function() {
            Users.getUsers(query);
            deferred.resolve(usersResult);
            rootScope.$apply();
            expect(Users.tableData).toEqual(usersResult);
        });

        it('should resolve to the factory object', function() {
            var result;
            Users.getUsers(query).then(function(obj) {
                result = obj;
            });
            deferred.resolve(usersResult);
            rootScope.$apply();
            expect(result).toEqual(Users);
        });

    });



});
/* jshint ignore:end */
