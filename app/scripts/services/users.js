(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name deepspace9App.Users
     * @description
     * # Users
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('Users', Users);

    function Users(FirebaseRef, $firebaseArray, $q, $filter) {

        var ref = FirebaseRef.ref;

        var fire = ref.child('users');

        // Public API here
        return {
            fArray: {},
            data: [],
            tableData: [],
            totalUsers: 0,
            getUsers: getUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            reSyncTableData: reSyncTableData
        };

        function deleteUser(deleteList) {
            return $q(function(resolve, reject) {
                var updateObj = {};
                angular.forEach(deleteList, function(val) {
                    updateObj[val.$id + '/isDisabled'] = true;
                });
                fire.update(updateObj, function(error){
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        }

        function createUser(newUser) {
            // generate a temporary password, remember january is 0
            var today = new Date();
            newUser.temporaryPassword = newUser.lastName.toLowerCase() + today.getMonth() + today.getDate();
            newUser.isDisabled = false;
            return $q(function(resolve, reject) {
                ref.createUser({
                    email: newUser.email,
                    password: newUser.temporaryPassword
                }, function(error, userData) {
                    if(error) {
                        console.log('Error creating user:', error);
                        reject(error);
                    } else {
                        console.log('Successfully created user with uid:', userData.uid);
                        // create the user in the firebase db
                        fire.child(userData.uid).set(newUser, function(error) {
                            if(error) {
                                reject(error);
                            } else {
                                resolve(newUser);
                            }
                        });
                    }
                });
            });
        }

        function reSyncTableData(query) {
            /*jshint validthis: true */
            var self = this;
            self.totalUsers = self.data.length;
            self.data = $filter('orderBy')(self.data, query.order);
            self.tableData = self.data.slice(query.limit * (query.page - 1), query.limit * query.page);
        }

        function getUsers(query) {
            /*jshint validthis: true */
            var self = this;
            var users = fire.orderByChild(query.order);
            return $q(function(resolve, reject) {
                //self.fArray = $firebaseArray(users);
                self.data = $firebaseArray(users);
                self.data.$loaded().then(function(data) {
                    self.totalUsers = data.length;
                    //self.data = $filter('orderBy')(data, query.order);
                    self.tableData = $filter('orderBy')(self.data, query.order).slice(query.limit * (query.page - 1), query.limit * query.page);
                    resolve(self);
                }).catch(function(response) {
                    console.log('rejected!');
                    console.log(response);
                    reject();
                });


            });
        }
    }
})();

