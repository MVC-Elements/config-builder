module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var sourcePath = 'src/'

  grunt.initConfig({
    express: {
      dev: {
        options: {
          server: 'server.js',
          port: 3000
        }
      }
    },
    copy: {
      index_dev: {
        files: [
          { src: 'src/index.src.html', dest: 'src/index.html' }
        ]
      },
      dev: {
        files: [
          { src: 'bower_components/angular/angular.js', dest: sourcePath + 'libs/angular.js' },
          { src: 'bower_components/restangular/dist/restangular.js', dest: sourcePath + 'libs/restangular.js' },
          { src: 'bower_components/foundation/css/foundation.css', dest: sourcePath + 'css/foundation.css' }
        ]
      },
      prod: {
        files: [
          { src: 'src/index.src.html', dest: 'public/index.html' },
          { src: 'bower_components/angular/angular.min.js', dest: 'public/libs/angular.min.js' },
          { src: 'bower_components/foundation/css/foundation.css', dest: 'public/css/foundation.css' }
        ]
      }
    },
    clean: {
      bower: ['bower_components'],
      public: ['public'],
    },
    html2js: {
      options: {
        base: 'public/app/',
        module: 'app-templates'
      },
      templates: {
        src: [sourcePath + 'app/**/views/**/*.html'],
        dest: sourcePath + 'app/templates.js'
      }
    },
    watch: {
      index: {
        files: [ sourcePath + 'index.src.html'],
        tasks: ['copy:index']
      },
      templates: {
        files: [ sourcePath + 'app/**/views/**/*.html'],
        tasks: ['html2js']
      }
    },
    ngAnnotate: {
      prod: {
        files: {
          'public/app/app.js': [
            sourcePath + 'app/**/*.js',
          ]
        }
      }
    },
    jshint: {
      all: {
        src: [ sourcePath + 'app/**/*.js'],

        options: {
          jshintrc: true
        }
      }
    }
  });


  grunt.registerTask('default', ['start']);
  grunt.registerTask('start', ['express:dev', 'watch', 'express-keepalive']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('install', ['copy:index_dev', 'copy:dev', 'clean:bower', 'html2js']);
  grunt.registerTask('build', ['clean:public', 'copy:prod', 'clean:bower', 'html2js', 'ngAnnotate:prod']);
};