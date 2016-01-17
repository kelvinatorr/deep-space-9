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


    function UsersCtrl($mdSidenav, $mdEditDialog, initQuery, users, $mdDialog, $mdMedia) {
        var vm = this;

        document.getElementById('testSubList').style.height = 0 + 'px';
        document.getElementById('testSubList').style.display = 'none';

        vm.subListShowing = false;

        vm.toggleSublist = toggleSublist;

        vm.toggleSideNav = toggleSideNav;

        vm.isOpenLeft = isOpenLeft;

        vm.selected = [];

        vm.query = initQuery;

        vm.onPaginate = onPaginate;

        vm.onReorder = onReorder;

        vm.editComment = editComment;

        vm.users = users;

        vm.promise = new Promise(function(resolve) {resolve();});

        vm.addUser = addUser;

        vm.deleteUser = deleteUser;

        function getData(query) {
            vm.promise = users.getUsers(query).then(function() {
                //vm.users = users.tableData;
            });
        }

        function onPaginate(page, limit) {
            console.log('calling paginate');
            console.log(page);
            console.log(limit);
            console.log(vm.query);
            //getData(vm.query);
        }

        function onReorder(order) {
            vm.query.order = order;
            getData(vm.query);
        }

        function editComment(event, dessert) {
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
        }

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

        function addUser(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var dialogPromise = $mdDialog.show(
                {
                    controller: 'UserDialogCtrl',
                    controllerAs: 'vm',
                    locals: {
                        action: 'Add'
                    },
                    bindToController: true,
                    templateUrl: 'views/user-form.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
                }
            );

            dialogPromise.then(function(user) {
                users.createUser(user).catch(function(error) {
                    alert(error);
                });
            });

            //$scope.$watch(function() {
            //    return $mdMedia('xs') || $mdMedia('sm');
            //}, function(wantsFullScreen) {
            //    $scope.customFullscreen = (wantsFullScreen === true);
            //});
        }

        function deleteUser(ev) {
            // TODO show confirmation alert
            users.deleteUser(vm.selected).catch(function(error) {
                alert(error);
            });
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
