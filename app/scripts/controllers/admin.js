(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:AdminCtrl
     * @description
     * # AdminCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('AdminCtrl', AdminCtrl);

    function AdminCtrl() {
        var self = this;

        var myFirebaseRef = new Firebase('https://deepspace9.firebaseio.com/');

        //myFirebaseRef.set({
        //    title: 'Hello World!',
        //    author: 'Firebase',
        //    location: {
        //        city: 'San Francisco Start',
        //        state: 'California',
        //        zip: 94103
        //    }
        //});

        myFirebaseRef.on('value', function(snapshot) {
            console.log(snapshot.val());
        });

        self.writeTest = function () {
            console.log('writing');
            var locationChild = myFirebaseRef.child('location/city');
            locationChild.set('boom headshot');
            var titleChild = myFirebaseRef.child('title');
            titleChild.set('ultrakill');
        };

        self.readTest = function() {
            myFirebaseRef.child('title').on('value', function(snapshot) {
                console.log('wut');
                console.log(snapshot.val());
            });
        };

        //TODO: Test Authentication
        //TODO: Figure out how to have a dev database (seperate firebase or just different tree?);
        //TODO: Figure out where to store files like resumes
        //TODO: Read about structuring data



    }
})();

