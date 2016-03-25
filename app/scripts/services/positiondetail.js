(function() {
    'use strict';

    /**
     * @ngdoc factory
     * @name deepspace9App.positionDetail
     * @description
     * # positionDetail
     * Factory in the deepspace9App.
     */
    angular.module('deepspace9App')
        .factory('PositionDetail', PositionDetail);

    function PositionDetail(FirebaseRef, $firebaseObject, $q) {

        return  {
            data: {},
            getData: getData,
            save: save
        };

        function getData(clientId, positionId) {
            /*jshint validthis: true */
            var self = this;
            return $q(function(resolve, reject) {
                self.data = $firebaseObject(FirebaseRef.ref.child('positions/' + clientId + '/' + positionId));
                self.data.$loaded().then(function() {
                    resolve(self);
                }).catch(function(response) {
                    reject(response);
                });
            });
        }

        function save(newData) {
            /*jshint validthis: true */
            var self = this;
            angular.forEach(self.data, function(val, key) {
                self.data[key] = newData[key];
            });
            return self.data.$save();
        }
    }

})();
