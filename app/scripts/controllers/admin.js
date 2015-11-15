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

    function AdminCtrl($scope, $firebaseArray) {
        var self = this;

        var ref = new Firebase('https://deepspace9.firebaseio.com/');

        self.userFormModel = {
            email: '',
            password: '',
            name: '',
            role: 'users'
        };

        self.users =  $firebaseArray(ref.child('users'));

        self.users.$loaded()
            .then(function() {
                console.log(self.users);
            })
            .catch(function(err) {
                console.error(err);
            });

        //ref.set({
        //    'users': {
        //        'mchen': {
        //            'name': 'Mary Chen',
        //            // index Mary's groups in her profile
        //            'groups': {
        //                // the value here doesn't matter, just that the key exists
        //                'alpha': true,
        //                'charlie': true
        //            }
        //        }
        //    }
        //});

        self.createUser = function() {
            ref.createUser({
                email: self.userFormModel.email,
                password: self.userFormModel.password
            }, function(error, userData) {
                if(error) {
                    console.log('Error creating user:', error);
                } else {
                    console.log('Successfully created user with uid:', userData.uid);
                    // create the user in the firebase db
                    console.log(userData);
                    ref.child('users').child(userData.uid).set({
                        name: self.userFormModel.name,
                        email: self.userFormModel.email,
                        role: self.userFormModel.role
                    });
                    // reset the form
                    $scope.$apply(self.userFormModel = {
                        email: '',
                        password: '',
                        name: '',
                        role: 'users'
                    });
                }
            });
        };

        self.testEdit = function(user) {
            user.name = 'Pepe';
            self.users.$save(user);
        };

        function authDataCallback(authData) {
            if (authData) {
                console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
            } else {
                console.log('User is logged out');
            }
        }
        ref.onAuth(authDataCallback);

        self.writeTest = function () {
            console.log('writing');

        };

        self.readTest = function() {

        };

        //TODO: Test Authentication
        //TODO: Figure out how to have a dev database (seperate firebase or just different tree?);
        //TODO: Figure out where to store files like resumes
        //TODO: Read about structuring data



    }
})();

