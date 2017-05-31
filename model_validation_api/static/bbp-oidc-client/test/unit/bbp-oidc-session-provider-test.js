/* global describe, it, expect, beforeEach, afterEach, jasmine, spyOn */
/* global module, inject, config */
/* global jso_registerRedirectHandler, jso_registerStorageHandler, jso_getToken, jso_ensureTokens, jso_Api_default_storage */
describe('bbpOidcSessionProvider', function() {
    'use strict';
    var sessionStatusUrl;

    beforeEach(function() {
        window.bbpConfig = {
            auth: {
                url: 'https://test.oidc.te/auth',
                clientId: 'test'
            }
        };

        spyOn(window, 'jso_ensureTokens').and.returnValue(true);
        spyOn(window, 'jso_getToken').and.returnValue(null);

        sessionStatusUrl = window.bbpConfig.auth.url + '/session';
    });

    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    describe("dependency to bbpOidcSession", function() {
        var bbpOidcSession;

        var initModule = function() {
            angular.module('fake', ['bbpOidcClient']);
            module('bbpOidcClient');
            module('fake');

            inject(function(_bbpOidcSession_){
                bbpOidcSession = _bbpOidcSession_;
            });
        };

        it("should by default ensure the token presence when there's a session", function() {
            jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                status: 200
            });
            initModule();
            expect(window.jso_ensureTokens).toHaveBeenCalled();
        });

        it("should by default ensure the token presence when there isn't a session", function() {
            jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                status: 401
            });
            initModule();
            expect(window.jso_ensureTokens).toHaveBeenCalled();
        });

        it("can not ensure the token presence", function() {
            jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                status: 401
            });
            window.bbpConfig.auth.ensureToken = false;
            initModule();
            expect(window.jso_ensureTokens).not.toHaveBeenCalled();
        });
    });
});
