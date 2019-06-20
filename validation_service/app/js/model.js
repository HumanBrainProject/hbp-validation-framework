var ApiCommunicationServices = angular.module('ApiCommunicationServices', ['ngResource', 'ngCookies', 'btorfs.multiselect']);

ApiCommunicationServices.factory('ScientificModelRest', ['$resource',
    function($resource) {
        return $resource('models/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
ApiCommunicationServices.factory('ScientificModelAliasRest', ['$resource',
    function($resource) {
        return $resource('model-aliases/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ValidationTestAliasRest', ['$resource',
    function($resource) {
        return $resource('test-aliases/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('ScientificModelInstanceRest', ['$resource',
    function($resource) {
        return $resource('model-instances/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);


ApiCommunicationServices.factory('ScientificModelImageRest', ['$resource',
    function($resource) {
        return $resource('images/:uuid', { id: '@eUuid' }, {
            // get: { method: 'GET', params: { format: 'json' }, isArray: false },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }

]);

ApiCommunicationServices.factory('ValidationTestDefinitionRest', ['$resource',
    function($resource) {
        return $resource('tests/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

ApiCommunicationServices.factory('ValidationTestCodeRest', ['$resource',
    function($resource) {
        return $resource('test-instances/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            delete: { method: 'DELETE', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
ApiCommunicationServices.factory('AreVersionsEditableRest', ['$resource',
    function($resource) {
        return $resource('areversionseditable/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            // put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            // post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
ApiCommunicationServices.factory('TestCommentRest', ['$resource',
    function($resource) {
        return $resource('testcomment/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);
ApiCommunicationServices.factory('TestTicketRest', ['$resource',
    function($resource) {
        return $resource('testticket/:uuid', { id: '@eUuid' }, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, isArray: false },
            put: { method: 'PUT', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } },
            post: { method: 'POST', params: { format: 'json', app_id: 'app_id', web_app: 'True' }, headers: { 'Content-Type': 'application/json' } }
        });
    }
]);

// ApiCommunicationServices.factory('ModelFollowRest', ['$resource',
//     function($resource) {
//         return $resource('modelfollowrest/:uuid', { id: '@eUuid' }, {
//             // get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
//             // put: { method: 'PUT', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } },
//             post: { method: 'POST', params: { format: 'json', app_id: 'app_id' }, headers: { 'Content-Type': 'application/json' } }
//         });
//     }
// ]);
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

ApiCommunicationServices.factory('AuthorizedOrganizationsRest', ['$resource',
    function($resource) {
        return $resource('authorizedorganizationsrest/', {}, {
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

ApiCommunicationServices.factory('IsCollabMemberOrAdminRest', ['$resource',
    function($resource) {
        return $resource('IsCollabMemberOrAdminRest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('IsCollabMemberRest', ['$resource',
    function($resource) {
        return $resource('IsCollabMemberRest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);
ApiCommunicationServices.factory('IsCollabReaderRest', ['$resource',
    function($resource) {
        return $resource('IsCollabReaderRest/', {}, {
            get: { method: 'GET', params: { format: 'json', app_id: 'app_id' }, isArray: false },
        });
    }
]);


ApiCommunicationServices.factory('ValidationResultRest', ['$resource',
    function($resource) {
        return $resource('results/', {}, {
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

ApiCommunicationServices.factory('NotificationRest', ['$resource',
    function($resource) {
        return $resource('notificationrest/', {}, {
            post: { method: 'POST', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('collabAppID', ['$resource',
    function($resource) {
        return $resource('collabappid/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);

ApiCommunicationServices.factory('IsSuperUserRest', ['$resource',
    function($resource) {
        return $resource('issuperuser/', {}, {
            get: { method: 'GET', params: { format: 'json', ctx: 'ctx' }, isArray: false },
        });
    }
]);