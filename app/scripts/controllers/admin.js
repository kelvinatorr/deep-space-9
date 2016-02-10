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

    function AdminCtrl($mdSidenav, currentUser) {
        var vm = this;

        document.getElementById('testSubList').style.height = 0 + 'px';
        document.getElementById('testSubList').style.display = 'none';

        vm.subListShowing = false;

        vm.toggleSublist = toggleSublist;

        vm.toggleSideNav = toggleSideNav;

        vm.isOpenLeft = isOpenLeft;

        vm.displayName = currentUser.data.firstName + ' ' + currentUser.data.lastName;

        vm.logout = logout;

        function toggleSublist() {
            if(!vm.subListShowing) {
                document.getElementById('testSubList').style.display = 'block';
                var height = 0;
                for(var i = 0; i < 48 * 2; i++) {
                    height += i;
                    document.getElementById('testSubList').style.height = i + 'px';
                }
            } else {
                document.getElementById('testSubList').style.display = 'none';
                document.getElementById('testSubList').style.height = 0 + 'px';

            }
            vm.subListShowing = !vm.subListShowing;
        }

        function isOpenLeft(){
            return $mdSidenav('left').isOpen();
        }

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }

        function logout() {

        }


        //TODO: Test Authentication
        //TODO: Figure out how to have a dev database (seperate firebase or just different tree?);
        //TODO: Figure out where to store files like resumes
        //TODO: Read about structuring data



    }
})();

