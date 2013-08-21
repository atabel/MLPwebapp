module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    uglify:
        all:
            options:
                sourceMap: 'build/appmonocle_c_j_m.js.map',
                sourceMapIn: 'build/appmonocle_c_j.js.map',
            files:
                'build/appmonocle_c_j_m.js': ['build/appmonocle_c_j.js']

    coffee:
        app:
            options:
                sourceMap: true
                # bare: false
                join: true
            files:
                'build/appmonocle_c_j.js': ['app/monocle/model/*.coffee', 'app/monocle/view/*.coffee', 'app/monocle/controller/*.coffee']

    # jshint:
    #     app:
    #         options:
    #             boss: true
    #             expr: true
    #             eqnull: true
    #         files:
    #             src: 'assets/js/site/base.js'

    watch:
        app:
            files: ['app/monocle/**/*.coffee']
            tasks: ['coffee', 'uglify']


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  # grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  # grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  # Default task.
  grunt.registerTask 'default', ['coffee', 'uglify']