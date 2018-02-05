// Karma configuration
// Generated on Thu Jan 04 2018 16:45:36 GMT+0100 (CET)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('jasmine-core'),
            require('karma-phantomjs-launcher'),
            require('karma-jasmine'),
            require('karma-spec-reporter'),
            require('karma-junit-reporter'),
        ],

        // list of files / patterns to load in the browser
        files: [

            // static files
            //lodash
            '../validation_service/app/static/lodash/lodash.min.js',

            //hello
            '../validation_service/app/static/hello/dist/hello.js',
            '../validation_service/app/static/hello/dist/hello.all.js',

            //angular
            '../validation_service/app/static/angular/angular.js',

            //angular-mocks
            '../validation_service/app/static/angular-mocks/angular-mocks.js',
            // '../validation_service/app/static/angular-mocks/ngAnimateMock.js',
            // '../validation_service/app/static/angular-mocks/ngMock.js',

            //angular-cookies
            '../validation_service/app/static/angular-cookies/angular-cookies.js',

            //angular-materials
            '../validation_service/app/static/node_modules/angular-material/angular-material.js',

            //angular-bbp-config
            '../validation_service/app/static/angular-bbp-config/angular-bbp-config.js',

            //bbp-oidc-client
            '../validation_service/app/static/bbp-oidc-client/angular-bbp-oidc-client.js',

            //angular-bootstrap
            '../validation_service/app/static/angular-bootstrap/ui-bootstrap-tpls.min.js',
            '../validation_service/app/static/angular-bootstrap-multiselect/dist/angular-bootstrap-multiselect.js',

            //angular-hbp-collaboratory
            '../validation_service/app/static/angular-hbp-collaboratory/angular-hbp-collaboratory.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/main.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/app/app.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/app/app.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/app/auth.provider.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/app/authHttp.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/app/bootstrap.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/error/error.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/error/error.module.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/env/env.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/env/env.provider.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/automator/automator.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/automator/automator.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/collab.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/collab.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/collab.model.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/clb-collab-app.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/collab-nav.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/collab-team-role.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/collab-team.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/context.model.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/collab/context.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/lodash/lodash.module.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/identity/identity.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/identity/group.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/identity/user.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/identity/util.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/rest/rest.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/rest/pagination.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/storage/storage.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/storage/storage.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ctx-data/clb-ctx-data.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ctx-data/clb-ctx-data.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/stream/stream.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/stream/resource-locator.provider.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/stream/stream.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-dialog/ui-dialog.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-dialog/confirm.service.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-error/ui-error.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-error/error-dialog.factory.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-error/error-message.directive.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-form/ui-form.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-form/form-control-focus.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-form/form-group-state.directive.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-identity/ui-identity.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-identity/user-avatar.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-identity/usercard-popover.service.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-identity/usercard-popover.tpl.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-identity/usercard.directive.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-loading/ui-loading.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-loading/loading.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-loading/perform-action.directive.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-storage/ui-storage.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-storage/file-browser-folder.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-storage/file-browser-path.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-storage/file-browser-tooltip.tpl.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-storage/file-browser.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-storage/file-upload.directive.js',

            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-stream/ui-stream.module.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-stream/activity.directive.js',
            '../validation_service/app/static/angular-hbp-collaboratory/src/ui-stream/feed.directive.js',

            //angular-hbp-common
            '../validation_service/app/static/angular-hbp-common/dist/angular-hbp-common.min.js',

            //angular-uuid4
            '../validation_service/app/static/angular-uuid4/angular-uuid4.js',

            //angular-ui-router
            '../validation_service/app/static/angular-ui-router/release/angular-ui-router.min.js',

            //angular-resource
            '../validation_service/app/static/angular-resource/angular-resource.min.js',

            //jquery
            '../validation_service/app/static/jquery/dist/jquery.js',

            //marked-hbp
            '../validation_service/app/static/marked-hbp/marked.min.js',

            //hbp-collaboratory-theme
            '../validation_service/app/static/hbp-collaboratory-theme/dist/javascripts/bootstrap.min.js',

            //nvd3
            '../validation_service/app/static/d3/d3.js',
            '../validation_service/app/static/nvd3/build/nv.d3.js',
            '../validation_service/app/static/angular-nvd3-1.0.8/dist/angular-nvd3.js',

            //others
            '../validation_service/app/static/ng-text-truncate-master/ng-text-truncate.js',

            '../validation_service/app/static/moment-2.19.2/moment.js',
            '../validation_service/app/static/angular-moment-1.1.0/angular-moment.js',

            //.js | files
            '../validation_service/app/js/*.js',
            './test_framework/*.js',

            //.spec.js | test files
            './test_framework/test_configuration/*.spec.js',
            './test_framework/test_model_catalog/*.spec.js',
            './test_framework/test_services/*.spec.js',
            './test_framework/test_validation_framework/*.spec.js',
            // './test_framework/*.spec.js',


        ],


        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}