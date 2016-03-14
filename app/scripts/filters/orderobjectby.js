(function() {

    'use strict';

    /**
     * @ngdoc filter
     * @name deepspace9App.filter:orderObjectBy
     * @function
     * @description
     * # orderObjectBy
     * Filter in the deepspace9App.
     */
    angular.module('deepspace9App')
        .filter('orderObjectBy', orderObjectBy);

    function orderObjectBy() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item, key) {
                item.$id = key;
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) {
                filtered.reverse();
            }
            return filtered;
        };
    }

})();
