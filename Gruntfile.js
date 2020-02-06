module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['dist'],
        },
        mkdir: {
            all: {
                options: {
                    mode: 775,
                    create: ['dist/css', 'dist/js']
                },
            },
        },
        sass: {
            options: {
                implementation: require('node-sass'),
                sourceMap: true,
                loadPath: ['/node_modules/foundation-sites/scss']
            },
            all: {
                files: {
                    'dist/css/main.css': ['src/css/main.scss']
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            all: {
                src: 'dist/css/main.css',
                dest: 'dist/css/main.min.css'
            }
        },
        concat: {
            options: {
                sourceMap: true
            },
            all: {
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/tilt.js/dest/tilt.jquery.js',
                    'node_modules/what-input/dist/what-input.js',
                    'node_modules/foundation-sites/dist/js/foundation.js',
                    'src/js/**'
                ],
                dest: 'dist/js/main.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true,
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            all: {
                files: {
                    "dist/js/main.min.js": 'dist/js/main.js'
                }
            }
        },
        realFavicon: {
            all: {
                src: 'assets/LogoInCircle.svg',
                dest: 'dist',
                options: {
                    iconsPath: './',
                    html: [ 'dist/header.html' ],
                    design: {
                        ios: {
                            masterPicture: {
                                content: 'assets/Logo.svg'
                            },
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#6ebe45',
                            margin: '14%',
                            assets: {
                                ios6AndPriorIcons: false,
                                ios7AndLaterIcons: false,
                                precomposedIcons: false,
                                declareOnlyDefaultIcon: true
                            },
                            appName: 'Elias\'s Portfolio'
                        },
                        desktopBrowser: {
                            design: 'raw'
                        },
                        windows: {
                            masterPicture: {
                                content: 'assets/Logo.svg'
                            },
                            pictureAspect: 'noChange',
                            backgroundColor: '#6ebe45',
                            onConflict: 'override',
                            assets: {
                                windows80Ie10Tile: false,
                                windows10Ie11EdgeTiles: {
                                    small: false,
                                    medium: true,
                                    big: false,
                                    rectangle: false
                                }
                            },
                            appName: 'Elias\'s Portfolio'
                        },
                        androidChrome: {
                            pictureAspect: 'shadow',
                            themeColor: '#6ebe45',
                            manifest: {
                                name: 'Elias\'s Portfolio',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override',
                                declared: true
                            },
                            assets: {
                                legacyIcon: true,
                                lowResolutionIcons: false
                            }
                        },
                        safariPinnedTab: {
                            masterPicture: {
                                content: 'assets/Logo.svg'
                            },
                            pictureAspect: 'silhouette',
                            themeColor: '#6ebe45'
                        }
                    },
                    settings: {
                        compression: 5,
                        scalingAlgorithm: 'Mitchell',
                        errorOnImageTooSmall: false,
                        readmeFile: false,
                        htmlCodeFile: false,
                        usePathAsIs: false
                    },
                    versioning: {
                        paramName: 'v',
                        paramValue: '1'
                    }
                }
            }
        },
        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.php'],
                        dest: 'dist/'
                    },
                ],
            },
        },
        watch: {
            sass: {
                files: 'src/css/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: 35729
                }
            },
            concat: {
                files: ['src/js/**'],
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },
            all: {
                files: ['src/**/*.html', 'src/**/*.php', 'src/**/*.inc'],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-real-favicon');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('default', ['mkdir', 'sass', 'concat', 'copy']);
    grunt.registerTask('prod', ['clean', 'mkdir', 'sass', 'cssmin', 'concat', 'uglify', 'realFavicon', 'copy']);
};
/*https://semaphoreci.com/community/tutorials/getting-started-with-grunt-js*/
