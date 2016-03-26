/**
 * Created by Kelvin on 3/26/2016.
 */
(function(formatLocal, isValidNumber) {
    'use strict';
    angular.module('deepspace9App')
        .directive('inputPhoneFormat', inputPhoneFormat);

    function inputPhoneFormat($log) {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                form: '='
            },
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl || !attrs.countryCode) {
                    $log.error('No ng-model or country code attribute for input phone format!');
                    return;
                }

                ctrl.$formatters.unshift(function() {
                    return formatLocal(attrs.countryCode, ctrl.$modelValue);
                });

                if(attrs.name && scope.form && scope.form[attrs.name]) {
                    elem.on('input', function() {
                        var val = elem.val();
                        // if it is not required then set the validity to true
                        if(!attrs.required && val === '') {
                            scope.$apply(scope.form[attrs.name].$setValidity('phoneNumber', true));
                        } else {
                            scope.$apply(scope.form[attrs.name].$setValidity('phoneNumber', isValidNumber(val, attrs.countryCode)));
                        }
                    });
                }

                ctrl.$parsers.unshift(function (viewValue) {
                    if(formatLocal) {
                        elem.val(formatLocal(attrs.countryCode, viewValue));
                    }
                    return viewValue.replace(/\D+/g,'');
                });
            }
        };
    }

})(formatLocal, isValidNumber);

