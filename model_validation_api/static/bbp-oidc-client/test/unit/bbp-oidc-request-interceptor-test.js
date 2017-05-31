/* global _, describe, it, expect, beforeEach, afterEach, jasmine, spyOn */
/* global module, inject */
/* global jso_registerStorageHandler */
/* global jso_Api_default_storage */

describe('bbpOidcRequestInterceptor', function() {
    'use strict';

    var $http, $httpBackend, url, bbpOidcSession, sessionStatusUrl;

    beforeEach(function() {
        window.bbpConfig = {
            auth: {
                url: 'https://test.oidc.te/auth',
                clientId: 'test',
                ensureToken: false
            },
            oidc: {
                debug: false
            }
        };
        sessionStatusUrl = window.bbpConfig.auth.url + '/session';

        // by default no session available
        jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
            status: 404
        });
    });

    beforeEach(function() {
        url = 'http://onehundredcoverage.com';
        module('bbpOidcClient');
        spyOn(window.parent, 'postMessage');
    });

    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    beforeEach(inject(function(_$http_, _$httpBackend_, _bbpOidcSession_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        bbpOidcSession = _bbpOidcSession_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        jso_registerStorageHandler(new jso_Api_default_storage());
    });

    describe('with a token', function() {

        beforeEach(function() {
            jso_registerStorageHandler({
                getToken: function() {
                    return { access_token: 'ABCD' };
                }
            });
            spyOn(window, 'jso_wipe').and.returnValue(true);
            bbpOidcSession.ensureToken(true);
        });

        it('set Authorization header', function() {
            $http.get(url);
            $httpBackend.expect('GET', url, null, function(headers) {
                return headers.Authorization === 'Bearer ABCD';
            }).respond(200);
            $httpBackend.flush();

            expect(window.jso_wipe).not.toHaveBeenCalled();
        });

        describe('on 401 error', function() {
            beforeEach(function() {
                $httpBackend.expect('GET', url, null, function(headers) {
                    return headers.Authorization === 'Bearer ABCD';
                }).respond(401);
            });

            it('should wipe the token', function() {
                $http.get(url);
                $httpBackend.flush();

                expect(window.jso_wipe).toHaveBeenCalled();
            });

            it('should post a logout request to parent windows if no active session',
                function() {
                    jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                        status: 404
                    });

                    $http.get(url);
                    $httpBackend.flush();

                    expect(window.parent.postMessage).toHaveBeenCalled();
                }
            );

            it('should NOT post a logout request to parent windows if there is an active session',
                function() {
                    jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                        status: 200
                    });

                    $http.get(url);
                    $httpBackend.flush();

                    expect(window.parent.postMessage).not.toHaveBeenCalled();
                }
            );

            it('should check if there is an active session', function() {
                jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                    status: 200
                });

                $http.get(url);
                $httpBackend.flush();

                var requests = _.filter(jasmine.Ajax.requests.filter(sessionStatusUrl), {
                    readyState: 4
                });
                expect(requests.length).toBe(1);
            });
        });

        describe('on !401 error', function() {
            it('should not wipe the token', function() {
                $http.get(url);
                $httpBackend.expect('GET', url, null, function(headers) {
                    return headers.Authorization === 'Bearer ABCD';
                }).respond(403);
                $httpBackend.flush();

                expect(window.jso_wipe).not.toHaveBeenCalled();
            });

            it('should not post a logout request to parent windows', function() {
                $http.get(url);
                $httpBackend.expect('GET', url, null, function(headers) {
                    return headers.Authorization === 'Bearer ABCD';
                }).respond(200);
                $httpBackend.flush();

                expect(window.parent.postMessage).not.toHaveBeenCalled();
            });

            describe('and another Authorization header', function() {
                it('should not replace it', function() {
                    $http.get(url, { headers: {
                        Authorization: 'Bearer EFGH'
                    }});
                    $httpBackend.expect('GET', url, null, function(headers) {
                        return headers.Authorization === 'Bearer EFGH';
                    }).respond(200);
                    $httpBackend.flush();
                });
            });
        });

    });

    describe('without a token', function() {
        beforeEach(function() {
            jso_registerStorageHandler({
                getToken: function() {
                    return null;
                },
                saveState: function() {}
            });

            spyOn(window, 'jso_ensureTokens').and.returnValue(null);
            spyOn(window, 'jso_wipe').and.returnValue(true);
        });

        it('set no Authorization header', function() {
            $http.get(url);
            $httpBackend.expect('GET', url, null, function(headers) {
                return headers.Authorization === undefined;
            }).respond(200);
            $httpBackend.flush();
        });

        it('if needed, tries to get a new one', function() {
            jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                status: 200
            });

            bbpOidcSession.ensureToken(true);
            window.jso_ensureTokens.calls.reset();

            $http.get(url);
            $httpBackend.expect('GET', url).respond(200);
            $httpBackend.flush();
            expect(window.jso_ensureTokens).toHaveBeenCalled();
        });

        it('if not needed, doesn\'t try to get a new one', function() {
            bbpOidcSession.ensureToken(false);
            window.jso_ensureTokens.calls.reset();

            $http.get(url);
            $httpBackend.expect('GET', url).respond(200);
            $httpBackend.flush();

            expect(window.jso_ensureTokens).not.toHaveBeenCalled();
        });

        it('if no active session, should post a logout request to parent windows', function() {
            jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                status: 404
            });

            bbpOidcSession.ensureToken(true);
            window.jso_ensureTokens.calls.reset();
            window.parent.postMessage.calls.reset();

            $http.get(url);
            $httpBackend.expect('GET', url).respond(200);
            $httpBackend.flush();

            expect(window.parent.postMessage).toHaveBeenCalled();
        });

        it('if active session, shoudld not post a logout request to parent windows', function() {
            jasmine.Ajax.stubRequest(sessionStatusUrl).andReturn({
                status: 200
            });

            bbpOidcSession.ensureToken(true);
            window.jso_ensureTokens.calls.reset();
            window.parent.postMessage.calls.reset();

            $http.get(url);
            $httpBackend.expect('GET', url).respond(200);
            $httpBackend.flush();

            expect(window.parent.postMessage).not.toHaveBeenCalled();
        });

        it('should not wipe the token on 401 error', function() {
            $http.get(url);
            $httpBackend.expect('GET', url).respond(401);
            $httpBackend.flush();

            expect(window.jso_wipe).not.toHaveBeenCalled();
        });

        it('should not post a logout request to parent windows on 401 error', function() {
            $http.get(url);
            $httpBackend.expect('GET', url).respond(401);
            $httpBackend.flush();

            expect(window.parent.postMessage).not.toHaveBeenCalled();
        });

        it('should not wipe the token on !401 error', function() {
            $http.get(url);
            $httpBackend.expect('GET', url).respond(403);
            $httpBackend.flush();

            expect(window.jso_wipe).not.toHaveBeenCalled();
        });

        it('should not post a logout request to parent windows on !401 error', function() {
            $http.get(url);
            $httpBackend.expect('GET', url).respond(200);
            $httpBackend.flush();

            expect(window.parent.postMessage).not.toHaveBeenCalled();
        });
    });

});
