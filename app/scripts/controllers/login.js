(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope) {

        var vm = this;

        var ref = new Firebase('https://deepspace9.firebaseio.com/');

        vm.loginFormModel = {
            email: '',
            password: ''
        };

        vm.login = login;

        //vm.logout = logout;

        vm.loginForm = {
            options: {
                debounce: 400
            }
        };

        vm.isLogginIn = false;


        // Register the callback to be fired every time auth state changes
        //ref.onAuth(authDataCallback);
        //
        //function authDataCallback(authData) {
        //    console.log('auth data callback fired');
        //    if (authData) {
        //        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        //    } else {
        //        console.log("User is logged out");
        //    }
        //    console.log(authData);
        //}

        function login(loginData) {
            vm.isLogginIn = true;
            ref.authWithPassword({
                email : loginData.email,
                password : loginData.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $scope.$apply(vm.isLogginIn = false);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    console.log(authData);
                    // go to next state
                }
            });
        }

        //function logout() {
        //    ref.unauth();
        //}
    }
})();

