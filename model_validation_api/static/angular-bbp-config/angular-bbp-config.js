(function() {
    'use strict';

    var get = function(key, defaultValue) {
        var parts = key.split('.');
        var cursor = window.bbpConfig;
        for (var i = 0; i < parts.length; i++) {
            if (!(cursor && cursor.hasOwnProperty(parts[i]))) {
                if (defaultValue !== undefined) {
                    return defaultValue;
                }
                throw new Error('UnkownConfigurationKey: <'+key+'>');
            }
            cursor =  cursor[parts[i]];
        }
        return cursor;
    };

    var bbpConfig = {
        get: get
    };

    angular.module('bbpConfig', [])
    /**
     * bbpConfig(key, [defaultValue]) provides configuration value loaded at
     * the application bootstrap.
     *
     * The service is a function that accept a key and an optional default
     * value. If the key cannot be found in the configurations, it will return
     * the provided default value. If the defaultValue is undefied, it will
     * throw an error.
     *
     * Contract ensures that those data are available when angular bootstrap the
     * application.
     */
    .constant('bbpConfig', bbpConfig);
}());
