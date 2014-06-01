module.exports = function(grunt) {
  
  // configuration
  grunt.initConfig({
    
    config: grunt.file.readJSON('gruntconfig.json'),
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 5 versions']
        },
        src: "<%= config.stylesheetProductionDir %>app.css",
        dest: "<%= config.stylesheetProductionDir %>app.css"
      }
    },

    coffee: {
      compile: {
        files: [{
          expand: true,
          src: '**/*.coffee',
          dest: '<%= config.scriptProductionDir %>',
          cwd: '<%= config.scriptBuildDir %>',
          ext: '.js'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        src: "<%= config.stylesheetBuildDir %>app.scss",
        dest: "<%= config.stylesheetProductionDir %>app.css"
      }
    },
    
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
              'assets/scripts/lib/*.js',
              '<%= config.scriptProductionDir %>utils/namespace.js',
              '<%= config.scriptProductionDir %>utils/loader.js',
              '<%= config.scriptProductionDir %>modules/*.js',
              '<%= config.scriptProductionDir %>pages/*.js',
              '<%= config.scriptProductionDir %>auchingarrich.js'
              ],
        // the location of the resulting JS file
        dest: '<%= config.scriptProductionDir %>app.js'
      }
    },

    uglify: {
      build: {
        src: '<%= config.scriptProductionDir %>app.js',
        dest: '<%= config.scriptProductionDir %>app.min.js'
      }
    },

    watch: {
      scripts: {
        files: ['<%= config.scriptBuildDir %>**/*.coffee'],
        tasks: ['coffee'],
        options: {
              livereload: true
        }
      },
      stylesheets: {
        files: ['<%= config.stylesheetBuildDir %>/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
              livereload: true
        }
      }
    },

    docco: {
      debug: {
        src: ['assets/js/build/*.js'],
        options: {
          output: 'docs/'
        }
      }
    }

  });

  // load plugins
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-docco');

  // on run
  grunt.registerTask('default', ['watch', 'autoprefixer', 'concat']);
  grunt.registerTask('document', ['docco']);


};