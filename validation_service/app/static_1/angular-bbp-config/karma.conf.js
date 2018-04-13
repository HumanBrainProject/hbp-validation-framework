// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    'use strict';
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'components/angular/angular.js',
            'components/angular-mocks/angular-mocks.js',
            'angular-bbp-config.js',
            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

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
        singleRun: false
    });
};
