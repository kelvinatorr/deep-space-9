'use strict';

describe('Controller: LoginCtrl', function () {
    var $timeout;

    var loginData = {
        email: '',
        password: ''
    };

    var loginError = true;

    var fire = {
        authWithPassword: function(data, callback) {
            callback(loginError);
        }
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
            $timeout: $timeout,
            fire: fire
        });
        loginError = true;
    }));

    it('should set isLoggingIn to true when login is called', function () {
        LoginCtrl.login(loginData);
        expect(LoginCtrl.isLoggingIn).toBe(true);
    });

    it('should set failed to false initially when login is called', function () {
        LoginCtrl.login(loginData);
        expect(LoginCtrl.failed).toBe(false);
    });

    it('should set failed to true when login is called and it fails', function () {
        LoginCtrl.login(loginData);
        $timeout.flush();
        expect(LoginCtrl.failed).toBe(true);
    });
});
