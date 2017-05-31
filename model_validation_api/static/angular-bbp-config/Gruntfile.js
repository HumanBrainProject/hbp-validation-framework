// Generated on 2014-05-14 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['*.js'],
                tasks: ['newer:jshint:all']
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        bump: {
            options: {
                files: ['bower.json'],
                commitFiles: ['angular-bbp-config.js', 'bower.json'],
                pushTo: 'origin HEAD:master'
            }
        },

        changelog: {
            options: {
                commitLink: function(h) { return 'https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularConfig.git/commit/?id='+h; },
                issueLink: function(issueId) { return 'https://bbpteam.epfl.ch/project/issues/browse/' + issueId; }
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'test',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'jshint',
        'karma'
    ]);

    grunt.registerTask('ci', 'Run all the build steps on the CI server', function (target) {

        // Junit reporter for JShint
        grunt.config('jshint.all.options.reporter', require('jshint-junit-reporter'));
        grunt.config('jshint.all.options.reporterOutput', 'reports/jshint-all-unit.xml');
        grunt.config('jshint.test.options.reporter', require('jshint-junit-reporter'));
        grunt.config('jshint.test.options.reporterOutput', 'reports/jshint-test-unit.xml');


        var tasks = ['default'];
        if (target === 'patch' || target === 'minor' || target === 'major') {
            tasks.unshift('bump-only:'+target);
            tasks.push('changelog', 'bump-commit');
        }
        grunt.task.run(tasks);
    });

    grunt.registerTask('default', ['test']);

};
