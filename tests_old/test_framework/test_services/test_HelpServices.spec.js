describe('Testing service: HelpServices', function() {
    'use strict';

    //create variables
    var MarkdownConverter;
    var clbStorage;
    var $location, $scope, $rootScope, $httpBackend;

    //load modules
    beforeEach(angular.mock.module('HelpServices', 'clb-storage'));

    // inject app elements into variables
    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$location_, _clbStorage_, _MarkdownConverter_) {
        MarkdownConverter = _MarkdownConverter_;
        clbStorage = _clbStorage_;

        $rootScope = _$rootScope_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;

    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    // test
    it('should get collabs from urls given', function() {

        var collabs_result = [1234, 5678];
        var urls_given = new Array();
        urls_given.push("(https://collab.humanbrainproject.eu/#/collab/1234/nav/111/122?state=uuid%3Df450feba-f029-469c-8dcc-24e3a0b15466)")
        urls_given.push("(https://anfakelinknotbelongingtocollab.com)")
        urls_given.push("(https://collab.humanbrainproject.eu/#/collab/5678/nav/125/35?state=uuid%3Af450feba-f029-469c-7dcc-24e3a0b15589)")
        console.log(urls_given)
        var res = MarkdownConverter._get_collabs_from_url(urls_given);
        expect(res).toEqual(collabs_result)

    });

    it('should not change collab_url images to real urls if text is null', function() {

        var text = null
        var res_expected = null

        var res_promise = MarkdownConverter.change_collab_images_url_to_real_url(text);

        res_promise.then(function(res) {
            expect(res).toEqual(res_expected)
        })

    });

    it('should not change collab_url images to real urls if text is not containing images', function() {

        var text = "blablabla"
        var res_expected = "blablabla"

        var res_promise = MarkdownConverter.change_collab_images_url_to_real_url(text);

        res_promise.then(function(res) {
            expect(res).toEqual(res_expected)
        })

    });

    it('should change collab_url images to real urls if more than two urls', function() {
        var res_is_member = new Array();
        res_is_member.push({ "collab_id": 1234, "is_member": true })
        var res_authorized_collabs = new Array();
        res_authorized_collabs.push('1234')
        $httpBackend.whenGET("IsCollabMemberRest?app_id=app_id&collab_id=1234&format=json").respond({
            'is_member': res_is_member,
            'is_authorized': res_authorized_collabs
        });
        var text = "bla bla bla ![image](https://collab.humanbrainproject.eu/#/collab/1234/nav/111/122?state=uuid%3Df450feba-f029-469c-8dcc-24e3a0b15466) blablabla ![image not from collab](https://notfromcollab.fr) blablabla "
        var res_expected = "bla bla bla ![image](https://new_url.fr) blablabla ![image not from collab](https://notfromcollab.fr) blablabla "

        spyOn(clbStorage, "downloadUrl").and.callFake(function() {
            return new Promise(function(resolve, reject) {
                resolve("https://new_url.fr")
            });
        });

        var res_promise = MarkdownConverter.change_collab_images_url_to_real_url(text);
        $httpBackend.flush();
        res_promise.then(function(res) {
            expect(res).toEqual(res_expected)
        })

    });

});