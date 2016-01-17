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

    function Users(APIEndpoint, $firebaseArray, $q, $filter) {

        var ref = new Firebase(APIEndpoint);

        var fire = ref.child('users');

        // Public API here
        return {
            data: [],
            tableData: [],
            totalUsers: 0,
            getUsers: getUsers,
            createUser: createUser,
            deleteUser: deleteUser
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

        function getUsers(query) {
            /*jshint validthis: true */
            var self = this;
            console.log(query);
            var users = fire.orderByChild(query.order);
            return $q(function(resolve, reject) {
                $firebaseArray(users).$loaded().then(function(data) {
                    self.totalUsers = data.length;
                    self.data = data;
                    //self.tableData = self.data.slice(0, query.limit);
                    self.tableData = data;
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

