///////////////////Test Authorized Collab Parameters Rest/////////////////////////////////////
describe('AuthorizedCollabParameterRest factory', function() {

    var AuthorizedCollabParameterRest;
    var $httpBackend, $q, $location, $scope;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_AuthorizedCollabParameterRest_, _$httpBackend_, _$q_, _$location_) {
        AuthorizedCollabParameterRest = _AuthorizedCollabParameterRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(AuthorizedCollabParameterRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist AuthorizedCollabParameterRest Factory', function() {
        expect(AuthorizedCollabParameterRest).toBeDefined();
    });

    it('should exist AuthorizedCollabParameterRest.get', function() {
        expect(AuthorizedCollabParameterRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get data from AuthorizedCollabParameterRest', function() {

        $httpBackend.expectGET('authorizedcollabparameterrest?app_id=app_id&format=json').respond(200);
        var rs1;
        rs1 = AuthorizedCollabParameterRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});




///////////////////Test Authorized Organization Rest/////////////////////////////////////
describe('AuthorizedOrganizationsRest factory', function() {
    // var authentificationToken = ;
    var AuthorizedOrganizationsRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_AuthorizedOrganizationsRest_, _$httpBackend_, _$q_, _$location_) {
        AuthorizedOrganizationsRest = _AuthorizedOrganizationsRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(AuthorizedOrganizationsRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist AuthorizedOrganizationsRest Factory', function() {
        expect(AuthorizedOrganizationsRest).toBeDefined();
    });

    it('should exist AuthorizedOrganizationsRest.get', function() {
        expect(AuthorizedOrganizationsRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from AuthorizedOrganizationsRest', function() {

        $httpBackend.expectGET('authorizedorganizationsrest?app_id=app_id&format=json').respond(200);
        var rs1;
        rs1 = AuthorizedOrganizationsRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});



///////////////////Test Authorized Score Type Rest/////////////////////////////////////
describe('AuthorizedScoreTypeRest factory', function() {
    // var authentificationToken = ;
    var AuthorizedScoreTypeRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_AuthorizedScoreTypeRest_, _$httpBackend_, _$q_, _$location_) {
        AuthorizedScoreTypeRest = _AuthorizedScoreTypeRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(AuthorizedScoreTypeRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist AuthorizedScoreTypeRest Factory', function() {
        expect(AuthorizedScoreTypeRest).toBeDefined();
    });

    it('should exist AuthorizedScoreTypeRest.get', function() {
        expect(AuthorizedScoreTypeRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from AuthorizedScoreTypeRest', function() {

        $httpBackend.expectGET('authorizedscoretyperest?app_id=app_id&format=json').respond(200);
        var rs1;
        rs1 = AuthorizedScoreTypeRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});



///////////////////TestCollab Parameter Rest/////////////////////////////////////
describe('CollabParameterRest factory', function() {
    // var authentificationToken = ;
    var CollabParameterRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_CollabParameterRest_, _$httpBackend_, _$q_, _$location_) {
        CollabParameterRest = _CollabParameterRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(CollabParameterRest, 'get').and.callThrough();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    //test if factory and methods exists
    it('should exist AuthorizedOrganizationsRest Factory', function() {
        expect(CollabParameterRest).toBeDefined();
    });

    it('should exist AuthorizedOrganizationsRest.get', function() {
        expect(CollabParameterRest.get).toBeDefined();
    });

    it('should exist AuthorizedOrganizationsRest.post', function() {
        expect(CollabParameterRest.post).toBeDefined();
    });
    it('should exist AuthorizedOrganizationsRest.put', function() {
        expect(CollabParameterRest.put).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from CollabParameterRest', function() {

        $httpBackend.expectGET('parametersconfigurationrest?app_id=app_id&format=json').respond(200);
        var rs1;
        rs1 = CollabParameterRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);

    });

    it('should post data to the database', function() {
        var app_id = 9999;
        var collab_id = 9999;
        $httpBackend.expectPOST('parametersconfigurationrest?app_id=app_id&collab_id=collab_id&format=json').respond(200);
        var rs1;
        var data = { 'app_id': app_id, 'app_type': 'model_catalog', 'collab_id': collab_id }
        rs1 = CollabParameterRest.post(data);

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});



///////////////Scientific Model Instance Rest/////////////////////////////// 
describe('ScientificModelInstanceRest factory', function() {

    var ScientificModelInstanceRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ScientificModelInstanceRest_, _$httpBackend_, _$q_, _$location_) {
        ScientificModelInstanceRest = _ScientificModelInstanceRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Initialize our local result object to an empty object before each test
        result = {};

        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ScientificModelInstanceRest, 'get').and.callThrough();
        spyOn(ScientificModelInstanceRest, 'post').and.callThrough();
        spyOn(ScientificModelInstanceRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ScientificModelInstanceRest Factory', function() {
        expect(ScientificModelInstanceRest).toBeDefined();
    });

    it('should exist ScientificModelInstanceRest.get', function() {
        expect(ScientificModelInstanceRest).toBeDefined();
    });

    it('should exist ScientificModelInstanceRest.post', function() {
        expect(ScientificModelInstanceRest.post).toBeDefined();
    });

    it('should exist ScientificModelInstanceRest.put', function() {
        expect(ScientificModelInstanceRest.put).toBeDefined();
    });


    it('test result ScientificModelInstanceRest.post', function() {
        var dataToPost = {
            'name': 'test_model_1',
            'description': 'no description to show',
            'author': 'Test Api',
            'private': true,
            'app': '9999',
        }
        $httpBackend.expectPOST("model-instances?app_id=app_id&format=json&web_app=True", dataToPost).respond(201, '');
        ScientificModelInstanceRest.post(dataToPost);
        $httpBackend.flush();
    });

    it('test result ScientificModelInstanceRest', function() {

        $httpBackend.expectGET("model-instances?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ScientificModelInstanceRest.get();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result ScientificModelInstanceRest.get', function() {
        var dataToPost = {
            'name': 'test_model_1',
            'description': 'no description to show',
            'author': 'Test Api',
            'private': true,
            'app': '9999',
        }
        $httpBackend.expectPUT("model-instances?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ScientificModelInstanceRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


///////////////////////////Scientific Model Rest factory/////////////////////////
describe('ScientificModelRest factory', function() {

    var ScientificModelRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ScientificModelRest_, _$httpBackend_, _$q_, _$location_) {
        ScientificModelRest = _ScientificModelRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Initialize our local result object to an empty object before each test
        result = {};

        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ScientificModelRest, 'get').and.callThrough();
        spyOn(ScientificModelRest, 'post').and.callThrough();
        spyOn(ScientificModelRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ScientificModelRest Factory', function() {
        expect(ScientificModelRest).toBeDefined();
    });

    it('should exist ScientificModelRest.get', function() {
        expect(ScientificModelRest.get).toBeDefined();
    });

    it('should exist ScientificModelRest.post', function() {
        expect(ScientificModelRest.post).toBeDefined();
    });

    it('should exist ScientificModelRest.put', function() {
        expect(ScientificModelRest.put).toBeDefined();
    });


    it('test result ScientificModelRest.post', function() {
        var dataToPost = {
            'name': 'test_model_1',
            'description': 'no description to show',
            'author': 'Test Api',
            'private': true,
            'app': '9999',
        }
        $httpBackend.expectPOST("models?app_id=app_id&format=json&web_app=True", dataToPost).respond(201, '');
        ScientificModelRest.post(dataToPost);
        $httpBackend.flush();
    });

    it('test result ScientificModelRest.get', function() {

        $httpBackend.expectGET("models?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ScientificModelRest.get();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result ScientificModelRest.get', function() {
        var dataToPost = {
            'name': 'test_model_1',
            'description': 'no description to show',
            'author': 'Test Api',
            'private': true,
            'app': '9999',
        }
        $httpBackend.expectPUT("models?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ScientificModelRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


///////////////////////////Scientific Model Image Rest factory/////////////////////////
describe('ScientificModelImageRest factory', function() {

    var ScientificModelImageRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ScientificModelImageRest_, _$httpBackend_, _$q_, _$location_) {
        ScientificModelImageRest = _ScientificModelImageRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Initialize our local result object to an empty object before each test
        result = {};

        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ScientificModelImageRest, 'get').and.callThrough();
        spyOn(ScientificModelImageRest, 'post').and.callThrough();
        spyOn(ScientificModelImageRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ScientificModelImageRest Factory', function() {
        expect(ScientificModelImageRest).toBeDefined();
    });

    it('should exist ScientificModelImageRest.get', function() {
        expect(ScientificModelImageRest.get).toBeDefined();
    });

    it('should exist ScientificModelImageRest.post', function() {
        expect(ScientificModelImageRest.post).toBeDefined();
    });

    it('should exist ScientificModelImageRest.put', function() {
        expect(ScientificModelImageRest.put).toBeDefined();
    });


    it('test result ScientificModelImageRest.post', function() {
        var dataToPost = {
            'url': 'test_model_1',
            'caption': 'no description to show',
            'model_id': 'bc0052ae-f79d-11e7-8c3f-9a214cf093ae',
        }
        $httpBackend.expectPOST("images?app_id=app_id&format=json&web_app=True", dataToPost).respond(201, '');
        ScientificModelImageRest.post(dataToPost);
        $httpBackend.flush();
    });

    it('test result ScientificModelImageRest.get', function() {
        $httpBackend.expectGET("images").respond(201, '');
        var res = ScientificModelImageRest.get(id = 'bc0052ae-f79d-11e7-8c3f-9a214cf093ae');
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result ScientificModelImageRest.put', function() {
        var dataToPost = {
            'url': 'test_model_1',
            'caption': 'no description to showww',
            'model_id': 'bc0052ae-f79d-11e7-8c3f-9a214cf093ae',
        }
        $httpBackend.expectPUT("images?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ScientificModelImageRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


//////////////////Test Authorized Score Type Rest/////////////////////////////////////
describe('AuthorizedScoreTypeRest factory', function() {
    // var authentificationToken = ;
    var AuthorizedScoreTypeRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_AuthorizedScoreTypeRest_, _$httpBackend_, _$q_, _$location_) {
        AuthorizedScoreTypeRest = _AuthorizedScoreTypeRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(AuthorizedScoreTypeRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist AuthorizedOrganizationsRest Factory', function() {
        expect(AuthorizedScoreTypeRest).toBeDefined();
    });

    it('should exist AuthorizedOrganizationsRest.get', function() {
        expect(AuthorizedScoreTypeRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from AuthorizedOrganizationsRest', function() {

        $httpBackend.expectGET('authorizedscoretyperest?app_id=app_id&format=json').respond(200);
        var rs1;
        rs1 = AuthorizedScoreTypeRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});



///////////////////Scientific model alias Rest/////////////////////////////////////
describe('ScientificModelAliasRest factory', function() {

    var ScientificModelAliasRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ScientificModelAliasRest_, _$httpBackend_, _$q_, _$location_) {
        ScientificModelAliasRest = _ScientificModelAliasRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ScientificModelAliasRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ScientificModelAliasRest Factory', function() {
        expect(ScientificModelAliasRest).toBeDefined();
    });

    it('should exist ScientificModelAliasRest.get', function() {
        expect(ScientificModelAliasRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from ScientificModelAliasRest', function() {

        $httpBackend.expectGET('model-aliases?app_id=app_id&format=json&web_app=True').respond(200);
        var rs1;
        rs1 = ScientificModelAliasRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);

    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

///////////////////Validation Test Alias Rest/////////////////////////////////////
describe('ValidationTestAliasRest factory', function() {

    var ValidationTestAliasRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ValidationTestAliasRest_, _$httpBackend_, _$q_, _$location_) {
        ValidationTestAliasRest = _ValidationTestAliasRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ValidationTestAliasRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ValidationTestAliasRest Factory', function() {
        expect(ValidationTestAliasRest).toBeDefined();
    });

    it('should exist ValidationTestAliasRest.get', function() {
        expect(ValidationTestAliasRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from ValidationTestAliasRest', function() {

        $httpBackend.expectGET('test-aliases?app_id=app_id&format=json&web_app=True').respond(200);
        var rs1;
        rs1 = ValidationTestAliasRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);

    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


///////////////////////////Validation Test Code Rest factory/////////////////////////
describe('ValidationTestCodeRest factory', function() {

    var ValidationTestCodeRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ValidationTestCodeRest_, _$httpBackend_, _$q_, _$location_) {
        ValidationTestCodeRest = _ValidationTestCodeRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ValidationTestCodeRest, 'get').and.callThrough();
        spyOn(ValidationTestCodeRest, 'post').and.callThrough();
        spyOn(ValidationTestCodeRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ValidationTestCodeRest Factory', function() {
        expect(ValidationTestCodeRest).toBeDefined();
    });

    it('should exist ValidationTestCodeRest.get', function() {
        expect(ValidationTestCodeRest.get).toBeDefined();
    });

    it('should exist ValidationTestCodeRest.post', function() {
        expect(ValidationTestCodeRest.post).toBeDefined();
    });

    it('should exist ValidationTestCodeRest.put', function() {
        expect(ValidationTestCodeRest.put).toBeDefined();
    });


    it('test result ValidationTestCodeRest.post', function() {

        $httpBackend.expectPOST("test-instances?app_id=app_id&format=json&web_app=True").respond(201, '');
        ValidationTestCodeRest.post();
        $httpBackend.flush();
    });

    it('test result ValidationTestCodeRest.get', function() {
        $httpBackend.expectGET("test-instances?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ValidationTestCodeRest.get();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result ValidationTestCodeRest.put', function() {
        $httpBackend.expectPUT("test-instances?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ValidationTestCodeRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

///////////////////////////Validation Test Definition Rest factory/////////////////////////
describe('ValidationTestDefinitionRest factory', function() {

    var ValidationTestDefinitionRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_ValidationTestDefinitionRest_, _$httpBackend_, _$q_, _$location_) {
        ValidationTestDefinitionRest = _ValidationTestDefinitionRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(ValidationTestDefinitionRest, 'get').and.callThrough();
        spyOn(ValidationTestDefinitionRest, 'post').and.callThrough();
        spyOn(ValidationTestDefinitionRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist ValidationTestDefinitionRest Factory', function() {
        expect(ValidationTestDefinitionRest).toBeDefined();
    });

    it('should exist ValidationTestDefinitionRest.get', function() {
        expect(ValidationTestDefinitionRest.get).toBeDefined();
    });

    it('should exist ValidationTestDefinitionRest.post', function() {
        expect(ValidationTestDefinitionRest.post).toBeDefined();
    });

    it('should exist ValidationTestDefinitionRest.put', function() {
        expect(ValidationTestDefinitionRest.put).toBeDefined();
    });


    it('test result ValidationTestDefinitionRest.post', function() {

        $httpBackend.expectPOST("tests?format=json&web_app=True").respond(201, '');
        ValidationTestDefinitionRest.post();
        $httpBackend.flush();
    });

    it('test result ValidationTestDefinitionRest.get', function() {
        $httpBackend.expectGET("tests?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = ValidationTestDefinitionRest.get();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result ValidationTestDefinitionRest.put', function() {
        $httpBackend.expectPUT("tests?format=json&web_app=True").respond(201, '');
        var res = ValidationTestDefinitionRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


///////////////////////////Test Comment Rest factory/////////////////////////
describe('TestCommentRest factory', function() {

    var TestCommentRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_TestCommentRest_, _$httpBackend_, _$q_, _$location_) {
        TestCommentRest = _TestCommentRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(TestCommentRest, 'get').and.callThrough();
        spyOn(TestCommentRest, 'post').and.callThrough();
        spyOn(TestCommentRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist TestCommentRest Factory', function() {
        expect(TestCommentRest).toBeDefined();
    });

    it('should exist TestCommentRest.get', function() {
        expect(TestCommentRest.get).toBeDefined();
    });

    it('should exist TestCommentRest.post', function() {
        expect(TestCommentRest.post).toBeDefined();
    });

    it('should exist TestCommentRest.put', function() {
        expect(TestCommentRest.put).toBeDefined();
    });


    it('test result TestCommentRest.post', function() {

        $httpBackend.expectPOST("testcomment?app_id=app_id&format=json&web_app=True").respond(201, '');
        TestCommentRest.post();
        $httpBackend.flush();
    });

    it('test result TestCommentRest.get', function() {
        $httpBackend.expectGET("testcomment?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = TestCommentRest.get();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result TestCommentRest.put', function() {
        $httpBackend.expectPUT("testcomment?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = TestCommentRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


///////////////////////////Test Comment Rest factory/////////////////////////
describe('TestTicketRest factory', function() {

    var TestTicketRest;
    var $httpBackend, $q, $location;

    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_TestTicketRest_, _$httpBackend_, _$q_, _$location_) {
        TestTicketRest = _TestTicketRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(TestTicketRest, 'get').and.callThrough();
        spyOn(TestTicketRest, 'post').and.callThrough();
        spyOn(TestTicketRest, 'put').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist TestTicketRest Factory', function() {
        expect(TestTicketRest).toBeDefined();
    });

    it('should exist TestTicketRest.get', function() {
        expect(TestTicketRest.get).toBeDefined();
    });

    it('should exist TestTicketRest.post', function() {
        expect(TestTicketRest.post).toBeDefined();
    });

    it('should exist TestTicketRest.put', function() {
        expect(TestTicketRest.put).toBeDefined();
    });


    it('test result TestTicketRest.post', function() {

        $httpBackend.expectPOST("testticket?app_id=app_id&format=json&web_app=True").respond(201, '');
        TestTicketRest.post();
        $httpBackend.flush();
    });

    it('test result TestTicketRest.get', function() {
        $httpBackend.expectGET("testticket?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = TestTicketRest.get();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    it('test result TestTicketRest.put', function() {
        $httpBackend.expectPUT("testticket?app_id=app_id&format=json&web_app=True").respond(201, '');
        var res = TestTicketRest.put();
        $httpBackend.flush();
        expect(res).not.toBe(null);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

//////////////////Test Is Collab Member Rest/////////////////////////////////////
describe('IsCollabMemberRest factory', function() {
    // var authentificationToken = ;
    var IsCollabMemberRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_IsCollabMemberRest_, _$httpBackend_, _$q_, _$location_) {
        IsCollabMemberRest = _IsCollabMemberRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(IsCollabMemberRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist IsCollabMemberRest Factory', function() {
        expect(IsCollabMemberRest).toBeDefined();
    });

    it('should exist IsCollabMemberRest.get', function() {
        expect(IsCollabMemberRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from IsCollabMemberRest', function() {

        $httpBackend.expectGET('iscollabmemberrest?app_id=app_id&format=json').respond(200);
        var rs1;
        rs1 = IsCollabMemberRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});


//////////////////Collab ID Rest/////////////////////////////////////
describe('CollabIDRest factory', function() {
    // var authentificationToken = ;
    var CollabIDRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_CollabIDRest_, _$httpBackend_, _$q_, _$location_) {
        CollabIDRest = _CollabIDRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(CollabIDRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist CollabIDRest Factory', function() {
        expect(CollabIDRest).toBeDefined();
    });

    it('should exist CollabIDRest.get', function() {
        expect(CollabIDRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from CollabIDRest', function() {

        $httpBackend.expectGET('collabidrest?ctx=ctx&format=json').respond(200);
        var rs1;
        rs1 = CollabIDRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

//////////////////App ID Rest/////////////////////////////////////
describe('AppIDRest factory', function() {
    // var authentificationToken = ;
    var AppIDRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_AppIDRest_, _$httpBackend_, _$q_, _$location_) {
        AppIDRest = _AppIDRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(AppIDRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist AppIDRest Factory', function() {
        expect(AppIDRest).toBeDefined();
    });

    it('should exist AppIDRest.get', function() {
        expect(AppIDRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from AppIDRest', function() {

        $httpBackend.expectGET('appidrest?ctx=ctx&format=json').respond(200);
        var rs1;
        rs1 = AppIDRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

//////////////////collab App ID/////////////////////////////////////
describe('collabAppID factory', function() {
    // var authentificationToken = ;
    var collabAppID;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_collabAppID_, _$httpBackend_, _$q_, _$location_) {
        collabAppID = _collabAppID_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(collabAppID, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist collabAppID Factory', function() {
        expect(collabAppID).toBeDefined();
    });

    it('should exist collabAppID.get', function() {
        expect(collabAppID.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from collabAppID', function() {

        $httpBackend.expectGET('collabappid?ctx=ctx&format=json').respond(200);
        var rs1;
        rs1 = collabAppID.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

//////////////////Are Versions Editable Rest/////////////////////////////////////
describe('AreVersionsEditableRest', function() {
    // var authentificationToken = ;
    var AreVersionsEditableRest;
    var $httpBackend, $q, $location, $scope;


    beforeEach(angular.mock.module('ApiCommunicationServices'));

    beforeEach(inject(function(_AreVersionsEditableRest_, _$httpBackend_, _$q_, _$location_) {
        AreVersionsEditableRest = _AreVersionsEditableRest_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $location = _$location_;
    }));

    beforeEach(function() {
        // Spy and force the return value when UsersFactory.all() is called
        spyOn(AreVersionsEditableRest, 'get').and.callThrough();
    });

    //test if factory and methods exists
    it('should exist AreVersionsEditableRest Factory', function() {
        expect(AreVersionsEditableRest).toBeDefined();
    });

    it('should exist AreVersionsEditableRest.get', function() {
        expect(AreVersionsEditableRest.get).toBeDefined();
    });

    // test funcions get, post, ...
    it('should get answer from AreVersionsEditableRest', function() {

        $httpBackend.expectGET('areversionseditable?app_id=app_id&format=json&web_app=True').respond(200);
        var rs1;
        rs1 = AreVersionsEditableRest.get();

        $httpBackend.flush();
        expect(rs1).not.toBe(null);
    });

    //check ethery tests have been done correctly and clean if necessary
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});