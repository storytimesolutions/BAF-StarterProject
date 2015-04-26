/**
 * Created by story_000 on 4/24/2015.
 */
module.exports = function(grunt) {


    grunt.initConfig({
        concat: {
            app: {
                options: {
                    separator: ';\n'
                },
                files: {
                    'dist/app.js': 'app/**/*.js',
                    'dist/app.css': 'app/**/*.css'
                }
            }
        },
        cssmin: {
            app:{
                files:{
                    'dist/app.min.css':'app/**/*.css'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js'],
            options: {

            }
        },
        karma: {
            app:{
                options: {
                    files: [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'app/**/*.js',
                        'appTests/unit-tests/**/*.spec.js'
                    ],
                    basePath: '',
                    frameworks: ['jasmine'],
                    exclude: [],
                    preprocessors: {},
                    reporters: ['progress'],
                    port: 9876,
                    colors: true,
                    logLevel: 'ERROR',
                    autoWatch: false,
                    browsers: ['PhantomJS'],
                    singleRun: true
                }
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            all: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "protractor.conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },
        uglify: {
            app: {
                files:{
                    'dist/app.min.js':'app/**/*.js'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('default', ['jshint','karma:app','concat:app','uglify:app','cssmin:app']);
    grunt.registerTask('tests', ['karma:app','protractor']);
};