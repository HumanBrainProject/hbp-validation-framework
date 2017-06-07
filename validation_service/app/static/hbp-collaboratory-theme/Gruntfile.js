'use strict';
module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    bowerDirectory: require('bower').config.directory,
    pkg: grunt.file.readJSON('bower.json'),


    // -----------------------
    // Build Tasks
    // -----------

    scsslint: {
      sass: ['sass/theme.scss'],
      options: {
        bundleExec: true,
        reporterOutput: 'reports/scss-lint-report.xml',
        colorizeOutput: true
      }
    },

    sass: {
      options: {
        sourceMap: true,
        includePaths: ['sass', '<%= bowerDirectory %>/bootstrap-sass/assets/stylesheets']
      },
      dist: {
        files: {
            '.tmp/dist/css/bootstrap.css': 'sass/theme.scss'
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: '.tmp/dist/css',
        src: ['*.css', '!*.min.css'],
        dest: '.tmp/dist/css',
        ext: '.min.css'
      }
    },

    assemble: {
      pages: {
        options: {
          data: './bower.json',
          flatten: true,
          assets: '.tmp/dist'
        },
        files: {
          '.tmp/dist/index.html': ['pages/index.html'],
          '.tmp/dist/examples/': ['pages/examples/*.html']
        }
      }
    },

    copy: {
      ci: {
        files: [
          // all .tmp/dist directory
          {expand: true, cwd: '.tmp/dist', src: ['**'], dest: 'dist/'},
          // Bootstrap sass files
          {
            expand: true,
            cwd: '<%= bowerDirectory %>/bootstrap-sass/assets/stylesheets',
            src: ['**', '!_bootstrap-*.scss'],
            dest: 'dist/sass/'
          },
          // all sass file to dist/sass
          {expand: true, src: ['sass/**/*'], dest: 'dist/'},
          // All Bootstrap javascript files
          {expand: true, cwd: '<%= bowerDirectory %>/bootstrap-sass/assets/', src: ['javascripts/bootstrap.*'], dest: 'dist/'}
        ]
      },
      fonts: {
        files: [
          // copy Bootstrap fonts
          {expand: true, cwd: '<%= bowerDirectory %>/bootstrap-sass/assets/fonts/bootstrap', src: ['**'], dest: '.tmp/dist/fonts'},
          // copy Gotham fonts
          {expand: true, cwd: 'assets/fonts', src: ['**'], dest: '.tmp/dist/fonts'}
        ]
      }
    },

    clean: ['dist', '.tmp', 'reports'],


    // -----------------------
    // Watch and Serve
    // ---------------

    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:dist'],
        options: {
          livereload: true
        }
      },
      rebuild: {
        files: ['.tmp/dist/css/bootstrap.css'],
        tasks: ['scsslint:sass', 'cssmin:minify', 'copy:ci']
      },
      assemble: {
        files: ['pages/*.html', 'pages/examples/*', 'README.md'],
        tasks: ['assemble']
      }
    },

    connect: {
      serve: {
        options: {
          port: grunt.option('port') || '8100',
          hostname: grunt.option('host') || 'localhost',
          base: '.tmp/dist'
        }
      }
    },


    // -----------------------
    // Publish and Release
    // ---------------

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'bower.json', 'CHANGELOG.md'],
        pushTo: 'origin HEAD:master',
        createTag: false
      }
    },

    gitadd: {
      dist: {
        files: { 'src': ['dist'] }
      }
    },

    gitcommit: {
      dist: {
        options: {
          message: 'built artefact',
          ignoreEmpty: true,
          force: true
        },
        files: { 'src': ['dist/**/*'] }
      }
    },

    gittag: {
      dist: {
        options: {
          tag: '<%=pkg.version%>',
          message: 'Version <%=pkg.version%> release'
        }
      }
    },

    gitpush: {
      dist: {
        options: {
          tags: true
        }
      }
    },

    changelog: {
      options: {
        commitLink: function(h) { return 'https://bbpteam.epfl.ch/reps/gerrit/platform/hbp/collaboratory-theme/commit/?id=' + h; },
        issueLink: function(issueId) { return 'https://bbpteam.epfl.ch/project/issues/browse/' + issueId; }
      }
    },

    exec: {
      'compressDoc': 'cd dist && zip ../.tmp/<%= pkg.name %>.zip *.* **/*.*',
      'uploadDoc': [
        'curl -X POST',
        '-F filedata=@.tmp/<%= pkg.name %>.zip',
        '-F name="HBP Collaboratory Theme"',
        '-F version="<%= pkg.version %>"',
        '-F description="<%= pkg.description %>"',
        'http://bbpgb027.epfl.ch:5000/docs/hmd'
      ].join(' ')
    }
  });


  // register task missed by load-grunt-task
  grunt.loadNpmTasks('assemble');

  // -----------------------
  // Main Targets
  // ------------

  grunt.registerTask('ci', function (target) {
    var tasks = ['default', 'copy:ci'];
    if (target === 'patch' || target === 'minor' || target === 'major') {
      tasks.unshift('bump-only:' + target);
      tasks.push('changelog', 'bump-commit', 'gitadd:dist', 'gitcommit:dist', 'gittag:dist', 'gitpush:dist', 'exec:compressDoc', 'exec:uploadDoc');
    }
    grunt.task.run(tasks);
  });

  grunt.registerTask('serve', ['clean', 'sass', 'copy:fonts', 'assemble', 'copy:ci', 'connect', 'watch']);

  // Disable scsslint until Jenkins issue has been resolved:
  // see: https://bbpteam.epfl.ch/project/issues/servicedesk/agent/HELP/issue/HELP-3252
  grunt.registerTask('default', ['clean', /*'scsslint',*/ 'sass', 'cssmin', 'copy:fonts', 'assemble']);
};
