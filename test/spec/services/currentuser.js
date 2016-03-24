'use strict';

describe('Service: CurrentUser', function () {

    // load the service's module
    beforeEach(module('deepspace9App'));

    var mockRef = {
        unauth: function() {},
        child: function() {

        }
    };

    var deferred;
    //
    var rootScope;

    function firebaseObject() {
        /*jshint validthis: true */
        if( !(this instanceof firebaseObject) ) {
            return new firebaseObject();
        }

        //var self = this;
        //this._observers = [];
        //this.$list = [];
        //console.log($firebaseUtils);
        //$firebaseUtils.getPublicMethods(self, function(fn, key) {
        //    self.$list[key] = fn.bind(self);
        //});

        //this.$list.$loaded = $loaded.bind(this);

        //this.$list.push.apply(this.$list, usersResult);
        //return this.$list;
    }



    beforeEach(module(function($provide) {
        $provide.value('FirebaseRef', {
            ref: mockRef
        });

        $provide.factory('$firebaseObject', function($q) {
            deferred = $q.defer();
            var promise = deferred.promise;

            firebaseObject.prototype = {
                $loaded: function(resolve, reject) {
                    //var promise = this.$$conf.sync.ready();
                    if (arguments.length) {
                        // allow this method to be called just like .then
                        // by passing any arguments on to .then
                        promise = promise.then.call(promise, resolve, reject);
                    }
                    return promise;
                }
            };

            return firebaseObject;
        });
    }));

    // instantiate service
    var CurrentUser;
    beforeEach(inject(function (_CurrentUser_, _$rootScope_) {
        rootScope =  _$rootScope_;
        // add spies
        spyOn(mockRef, 'unauth');
        CurrentUser = _CurrentUser_;
    }));

    describe('logout', function(){
        it('should call firebase unauth', function () {
            CurrentUser.logout();
            expect(mockRef.unauth).toHaveBeenCalled();
        });
    });


    describe('getMembership', function() {
        var uid = 'cb516b90-7a3f-4f76-aed7-036fac453bf2';

        it('should return a promise', function() {
            var result = CurrentUser.getMembership(uid);
            expect('then' in result).toBe(true);
        });

        it('should return a firebaseObject', function() {
            var resolvedData = {};
            CurrentUser.getMembership(uid).then(function(result) {
                resolvedData = result;
            });
            deferred.resolve();
            rootScope.$apply();
            expect(resolvedData instanceof firebaseObject).toBe(true);

        });
    });




});
