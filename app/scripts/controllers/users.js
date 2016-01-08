(function() {


    'use strict';

    /**
     * @ngdoc function
     * @name deepspace9App.controller:UsersCtrl
     * @description
     * # UsersCtrl
     * Controller of the deepspace9App
     */
    angular.module('deepspace9App')
        .controller('UsersCtrl', UsersCtrl);

        var vm = this;

        document.getElementById('testSubList').style.height = 0 + 'px';

        vm.subListShowing = false;

        vm.toggleSublist = toggleSublist;

        vm.toggleSideNav = toggleSideNav;

        vm.isOpenLeft = isOpenLeft;

        function toggleSublist() {
            console.log('changing!');
            if(!vm.subListShowing) {
                var height = 0;
                for(var i = 0; i < 48 * 2; i++) {
                    height += i;
                    console.log(height);
                    document.getElementById('testSubList').style.height = i + 'px';
                }
            } else {
                document.getElementById('testSubList').style.height = 0 + 'px';
            }
            vm.subListShowing = !vm.subListShowing;
            //$scope.$apply();
        }

        function isOpenLeft(){
            return $mdSidenav('left').isOpen();
        }

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        //function debounce(func, wait, context) {
        //    var timer;
        //    return function debounced() {
        //        var context = $scope,
        //            args = Array.prototype.slice.call(arguments);
        //        $timeout.cancel(timer);
        //        timer = $timeout(function() {
        //            timer = undefined;
        //            func.apply(context, args);
        //        }, wait || 10);
        //    };
        //}
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        //function buildDelayedToggler(navID) {
        //    return debounce(function() {
        //        $mdSidenav(navID)
        //            .toggle()
        //            .then(function () {
        //                $log.debug("toggle " + navID + " is done");
        //            });
        //    }, 200);
        //}
    }

})();
