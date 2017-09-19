var ApiCommunicationServices = angular.module('ApiCommunicationServices', ['ngResource', 'ngCookies', 'btorfs.multiselect']);

ApiCommunicationServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource('scientificmodel/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
ApiCommunicationServices.factory('ScientificModelAliasRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelalias/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ValidationTestAliasRest', ['$resource',
    function($resource) {
        return $resource('validationtestalias/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelinstance/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


ApiCommunicationServices.factory('ScientificModelImageRest', ['$resource',
    function($resource) {
        return $resource('scientificmodelimage/:uuid', { id: '@eUuid' }, {
            // get: { method: 'GET', params: { format: 'json' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }

]);

ApiCommunicationServices.factory('ValidationTestDefinitionRest', ['$resource',
    function($resource) {
        return $resource('validationtestdef/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('ValidationTestCodeRest', ['$resource',
    function($resource) {
        return $resource('validationtestscode/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', app_id: 'app_id'}, headers:{ 'Content-Type':'application/json' }},
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('TestCommentRest', ['$resource',
    function($resource) {
        return $resource('testcomment/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
ApiCommunicationServices.factory('TestTicketRest', ['$resource',
    function($resource) {
        return $resource('testticket/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


/////////////////////////
ApiCommunicationServices.factory('CollabParameterRest', ['$resource',
    function($resource) {
        return $resource('parametersconfigurationrest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, isArray: false, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', collab_id: 'collab_id' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


ApiCommunicationServices.factory('AuthorizedCollabParameterRest', ['$resource',
    function($resource) {
        return $resource('authorizedcollabparameterrest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', app_id: 'app_id' }, headers:{ 'Content-Type':'application/json' }},
            // post: { method: 'POST', params: { format: 'json', app_id: 'app_id'  }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('AuthorizedScoreTypeRest', ['$resource',
    function($resource) {
        return $resource('authorizedscoretyperest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
            //   put: {method:'PUT', params:{format:'json', app_id: 'app_id' }, headers:{ 'Content-Type':'application/json' }},
            // post: { method: 'POST', params: { format: 'json', app_id: 'app_id'  }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('IsCollabMemberRest', ['$resource',
    function($resource) {
        return $resource('iscollabmemberrest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);


ApiCommunicationServices.factory('ValidationResultRest_fortest', ['$resource',
    function($resource) {
        return $resource('validationresultrest_fortest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ValidationTestResultRest', ['$resource',
    function($resource) {
        return $resource('validationtestresultrest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ValidationResultRest', ['$resource',
    function($resource) {
        return $resource('validationresultrest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ValidationModelResultRest', ['$resource',
    function($resource) {
        return $resource('validationmodelresultrest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('CollabIDRest', ['$resource',
    function($resource) {
        return $resource('collabidrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('AppIDRest', ['$resource',
    function($resource) {
        return $resource('appidrest/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);