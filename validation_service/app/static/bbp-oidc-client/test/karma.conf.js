/* jshint node: true */

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
    'use strict';

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine-ajax', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // framework
            'components/angular/angular.js',
            'components/angular-bbp-config/angular-bbp-config.js',

            // vendors
            'components/crypto-js/core.js',
            'components/crypto-js/sha256.js',
            'components/crypto-js/x64-core.js',
            'components/crypto-js/enc-base64.js',
            'components/jsrsasign/ext/base64-min.js',
            'components/jsrsasign/ext/jsbn-min.js',
            'components/jsrsasign/ext/rsa-min.js',
            'components/jsrsasign/rsasign-1.2.min.js',
            'components/jsrsasign/crypto-1.1.min.js',
            'components/jsrsasign/base64x-1.1.min.js',
            'components/jsjws/ext/json-sans-eval.js',
            'components/jsjws/jws-2.0.min.js',
            'src/jso.js',

            // app
            'src/bbp-oidc.js',
            'src/angular-bbp-oidc.js',

            // test support
            'components/angular-mocks/angular-mocks.js',
            'components/lodash/lodash.min.js',

            // tests
            'test/unit/*.js',
        ],

        preprocessors: {
            // source files, that you want to generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/angular-bbp-oidc.js': ['coverage']
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8018,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        reporters: ['progress', 'junit', 'coverage'],

        junitReporter: {
            outputFile: 'reports/karma-unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            dir : 'reports/coverage/',
            reporters: [
                {
                    type : 'lcov',
                    dir:   'reports/coverage/',
                    file : 'coverage.info'
                },
                {
                    type : 'cobertura',
                    dir:   'reports/coverage/'
                },
            ]
        },

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
