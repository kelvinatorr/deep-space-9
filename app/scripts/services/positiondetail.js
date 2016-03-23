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
            getData: getData
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
    }

})();
