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

    function UsersCtrl($mdSidenav, $scope, $q, $timeout, $mdEditDialog, fire, $firebaseArray) {
        var vm = this;

        document.getElementById('testSubList').style.height = 0 + 'px';
        document.getElementById('testSubList').style.display = 'none';

        vm.subListShowing = false;

        vm.toggleSublist = toggleSublist;

        vm.toggleSideNav = toggleSideNav;

        vm.isOpenLeft = isOpenLeft;

        function toggleSublist() {
            console.log('changing!');
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
            //$scope.$apply();
        }

        function isOpenLeft(){
            return $mdSidenav('left').isOpen();
        }

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }


        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        function getDesserts(query) {
            console.log('Get desserts called with:');
            console.log(query);
            //$scope.promise = $nutrition.desserts.get(query, success).$promise;
            var gets = function(query, successCallback) {
                return $q(function(resolve) {
                    $timeout(function() {
                        var data = [
                            {
                                name: 'Peach',
                                calories: 100,
                                fat: 100,
                                carbs: 150,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            },
                            {
                                name: 'Strawberry',
                                calories: 223,
                                fat: 6598,
                                carbs: 1500,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            },
                            {
                                name: 'Strawberry',
                                calories: 223,
                                fat: 6598,
                                carbs: 1500,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            },
                            {
                                name: 'Strawberry',
                                calories: 223,
                                fat: 6598,
                                carbs: 1500,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            },
                            {
                                name: 'Strawberry',
                                calories: 223,
                                fat: 6598,
                                carbs: 1500,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            },
                            {
                                name: 'Watermelons',
                                calories: 223,
                                fat: 6598,
                                carbs: 1500,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            },
                            {
                                name: 'Strawberry22',
                                calories: 223,
                                fat: 6598,
                                carbs: 1500,
                                protein: 200,
                                sodium: 10,
                                calcium: 10,
                                iron: 5
                            }
                        ];
                        //console.log('hi timeout done');
                        successCallback(data);
                        resolve();
                    }, 2000);
                });
            };

            //$scope.promise = gets(query, success);
            //$scope.promise = $firebaseArray(fire.child('users')).$loaded(function(x) {
            //    $scope.desserts = x;
            //});
            var ref = fire.child('users').orderByChild(query.order).limitToLast(query.limit);

            $scope.promise = $firebaseArray(ref).$loaded().then(function(x) {
                $scope.desserts = x;
            });
        }

        getDesserts($scope.query);

        function success(desserts) {
            $scope.desserts = $firebaseArray(fire.child('users'));
            console.log($scope.desserts);
        }

        $scope.onPaginate = function (page, limit) {
            getDesserts(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            console.log('on reorder called with ' + order);
            $scope.query.order = order;
            console.log($scope.query);
            getDesserts($scope.query);
            //getDesserts(angular.extend({}, $scope.query, {order: order}));
        };

        $scope.editComment = function (event, dessert) {
            // if auto selection is enabled you will want to stop the event
            // from propagating and selecting the row
            event.stopPropagation();

            /*
             * messages is commented out because there is a bug currently
             * with ngRepeat and ngMessages were the messages are always
             * displayed even if the error property on the ngModelController
             * is not set, I've included it anyway so you get the idea
             */

            var promise = $mdEditDialog.large({
                // messages: {
                //   test: 'I don\'t like tests!'
                // },
                modelValue: dessert.comment,
                placeholder: 'Add a comment',
                save: function (input) {
                    console.log('save function called');
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
            });

            promise.then(function (ctrl) {
                console.log('edit dialog promise resolved');
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

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
