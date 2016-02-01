/**
 * Gruntfile for freedom-portacrypt
 *
 * Autogenerated by https://github.com/freedomjs/generator-freedom
 **/

var freedompath = require.resolve('freedom');

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    jasmine_node: 'grunt-jasmine-node2'
  });

  grunt.initConfig({
    copy: {
      build: {
        cwd: 'src/',
        src: ['**'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile',
        expand: true
      },
      freedom: {
        src: [freedompath],
        dest: 'build/',
        flatten: true,
        filter: 'isFile',
        expand: true,
        onlyIf: 'modified'
      }
    },

    jshint: {
      all: ['src/**/*.js', 'spec/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      browsers: {
        singleRun: true,
        autoWatch: false
      },
      watch: {
        singleRun: false,
        autoWatch: true,
        reporters: ['progress', 'story'],
        preprocessors: {},
        coverageReporter: {}
      },
      phantom: {
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false
      }
    },

    // TODO make demo work in other freedom flavors (Chrome/FF/Node)
    connect: {
      demo: {
        options: {
          port: 8000,
          keepalive: true,
          base: ['./', 'build/'],
          open: 'http://localhost:8000/build/'
        }
      }
    },

    clean: ['build/', '.build/']
  });

  grunt.registerTask('build', [
    'jshint',
    'copy',
    'karma:phantom'
  ]);
  grunt.registerTask('test', [
    'build',
    'karma:browsers',
    'karma:phantom'
  ]);
  grunt.registerTask('demo', [
    'build',
    'connect'
  ]);
  grunt.registerTask('default', [
    'build'
  ]);

}
