var util = require('util');

var DECLARATION = 'window.globals = window.globals || {};\n',
    TEMPLATE = function (key, value) {
        var template = 'window.globals[\'%s\'] = \'%s\';\n';
        return util.format(template, key, value);
    };

var createGlobalVariables = function (args, config, logger, helper) {
    var log = logger.create('preprocessor.global'),
        globals = config.globals || {};
    log.info('Attaching the global variables to the window.globals object: ', globals);

    return function (content, file, done) {
        var envContent = DECLARATION;

        Object.keys(globals).forEach(function (key) {
            envContent += TEMPLATE(key, globals[key]);
        });

        done(envContent + '\n' + content);
    };

};

module.exports = {
    'preprocessor:global': ['factory', createGlobalVariables]
};