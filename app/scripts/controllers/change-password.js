(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:ChangePasswordCtrl
     * @description
     * # ChangePasswordCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    function ChangePasswordCtrl(CurrentUser, $timeout, $scope) {
        var vm = this;

        $scope.$on('$viewContentLoaded', function() {
           $timeout(function() {
               $('#old-password').focus();
           }, 24);
        });

        vm.user = {
            current: '',
            password: '',
            confirm: ''
        };

        vm.save = save;

        vm.success = false;

        vm.error = false;

        vm.samePasswordCheck = samePasswordCheck;

        vm.isSaving = false;

        //console.log(CurrentUser.data);

        //vm.passwordStrength = {
        //    display: false,
        //    score: 1,
        //    message: '',
        //    warning: '',
        //    suggestion: '',
        //    barClass: {
        //        'gl-25': true,
        //        'gl-50': false,
        //        'gl-75': false,
        //        'gl-100': false
        //    }
        //};

        /**
         * Show message above form or not
         * @type {boolean}
         */
        vm.requirePWReset = CurrentUser.data.hasTemporaryPassword;

        //vm.passwordWatcher = passwordWatcher;

        //function passwordWatcher() {
        //    vm.samePasswordCheck();
        //    if(vm.user.password) {
        //        // check password strength - https://github.com/dropbox/zxcvbn
        //        var result = zxcvbn(vm.user.password);
        //        vm.passwordStrength.score = result.score * 25;
        //
        //        switch (vm.passwordStrength.score) {
        //            case 25:
        //                vm.passwordStrength.message = 'Very Weak';
        //                break;
        //            case 50:
        //                vm.passwordStrength.message = 'Weak';
        //                break;
        //            case 75:
        //                vm.passwordStrength.message = 'Good';
        //                break;
        //            case 100:
        //                vm.passwordStrength.message = 'Great!';
        //                break;
        //            default:
        //                vm.passwordStrength.message = 'None';
        //                break;
        //        }
        //
        //        // set class for bar color
        //        angular.forEach(vm.passwordStrength.barClass, function(val, key) {
        //            vm.passwordStrength.barClass[key] = key === ('gl-' + vm.passwordStrength.score);
        //        });
        //
        //        if(result.feedback.warning.length > 0) {
        //            vm.passwordStrength.warning = result.feedback.warning;
        //        } else {
        //            vm.passwordStrength.warning = '';
        //        }
        //
        //        if(result.feedback.suggestions.length > 0) {
        //            vm.passwordStrength.suggestion = result.feedback.suggestions[0];
        //        } else {
        //            vm.passwordStrength.suggestion = '';
        //        }
        //
        //        vm.passwordForm.password.$setValidity('goodPassword', vm.passwordStrength.score > 50);
        //
        //        vm.passwordStrength.display = true;
        //    } else {
        //        vm.passwordStrength.display = false;
        //    }
        //}

        function samePasswordCheck() {
            if(!vm.passwordForm.confirm.$dirty && vm.user.confirm.length < 1) {
                return true;
            }
            var samePassword = vm.user.password === vm.user.confirm;
            vm.passwordForm.confirm.$setValidity('samePassword', samePassword);
            return samePassword;
        }

        function save() {
            var apiModel = {
                oldPassword: vm.user.current,
                newPassword: vm.user.password
            };
            vm.isSaving = true;
            CurrentUser.changePassword(apiModel).then(function() {
                vm.success = true;
                vm.passwordForm.$setPristine();
                vm.error = false;
                vm.isSaving = false;
            }).catch(function() {
                vm.error = true;
                vm.success = false;
                vm.isSaving = false;
            });
        }

    }

})();
