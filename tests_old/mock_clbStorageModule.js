'use-strict';
angular.module('clb-storage', [])
    .factory('clbStorage', function() {

        var downloadUrl = function() {

        }
        return {
            downloadUrl: downloadUrl,
        }
    });

angular.module('clb-ui-error', [])

angular.module('clb-env', [])

angular.module('clb-app', [])
    .provider('clbAuth', function() {
        return {
            $get: function() {

            }
        };
    })

angular.module('clb-collab', [])
    .service('clbCollabNav', function() {
        return null
    })

angular.module('hbpCollaboratory', [])