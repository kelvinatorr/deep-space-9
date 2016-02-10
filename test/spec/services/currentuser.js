'use strict';

describe('Service: CurrentUser', function () {

    // load the service's module
    beforeEach(module('deepspace9App'));

    var mockRef = {
        unauth: function() {}
    };

    //var deferred;
    //
    //var rootScope;

    beforeEach(module(function($provide) {
        $provide.value('FirebaseRef', {
            ref: mockRef
        });

        //$provide.factory('$firebaseArray', function($q) {
        //    deferred = $q.defer();
        //    var promise = deferred.promise;
        //
        //    function $loaded() {
        //        return promise;
        //    }
        //
        //    function firebaseArray() {
        //        if( !(this instanceof firebaseArray) ) {
        //            return new firebaseArray();
        //        }
        //
        //        //var self = this;
        //        //this._observers = [];
        //        this.$list = [];
        //        //console.log($firebaseUtils);
        //        //$firebaseUtils.getPublicMethods(self, function(fn, key) {
        //        //    self.$list[key] = fn.bind(self);
        //        //});
        //
        //        this.$list.$loaded = $loaded.bind(this);
        //
        //        this.$list.push.apply(this.$list, usersResult);
        //        return this.$list;
        //    }
        //
        //    //firebaseArray.prototype = {
        //    //    $loaded: function() {
        //    //        return promise;
        //    //    }
        //    //};
        //    return firebaseArray;
        //});
    }));

    // instantiate service
    var CurrentUser;
    beforeEach(inject(function (_CurrentUser_) {
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




});
