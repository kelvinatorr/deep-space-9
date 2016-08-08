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

    function LoginCtrl($timeout, fire, $state) {

        var vm = this;

        var ref = fire;

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

        vm.isLoggingIn = false;

        vm.failed = false;


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

            var signalFailed = function() {
                $timeout(function() {
                    vm.isLoggingIn = false;
                    vm.failed = true;
                });
            };

            vm.isLoggingIn = true;
            vm.failed = false;
            ref.authWithPassword({
                email : loginData.email,
                password : loginData.password
            }, function(error) {
                if (error) {
                    signalFailed();
                } else {
                    // go to next state
                    $state.go('clients', {init: true}).catch(function() {
                        // failed probably because user is disabled and cannot resolve CurrentUser
                        signalFailed();
                    });
                }
            });
        }

        //function logout() {
        //    ref.unauth();
        //}
    }
})();

