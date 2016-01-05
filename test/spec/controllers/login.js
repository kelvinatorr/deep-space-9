'use strict';

describe('Controller: LoginCtrl', function () {
    var $timeout;

    var loginData = {
        email: '',
        password: ''
    };

    // load the controller's module
    beforeEach(module('deepspace9App'));

    var LoginCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$injector_) {
        scope = $rootScope.$new();
        $timeout = _$injector_.get('$timeout');
        LoginCtrl = $controller('LoginCtrl', {
            $timeout: $timeout
            //APIEndpoint: ''
        });
    }));

    it('should set isLoggingIn to true when login is called', function () {
        LoginCtrl.login(loginData);
        expect(LoginCtrl.isLoggingIn).toBe(true);
    });

    it('should set failed to false when login is called', function () {
        LoginCtrl.login(loginData);
        expect(LoginCtrl.failed).toBe(false);
    });
});
