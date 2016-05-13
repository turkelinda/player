module.exports = function (grunt) {

    /* app specific actions and tasks */
    grunt.extendConfig({
        placeholder: {
            "app": {"files": [{cwd: "src/app/", src: "**/*.js", dest: "tmp/stage1/app"}]},
            "i18n": {"files": [{cwd: "src/app/", src: ["**/de.json", "**/en.json"], dest: "tmp/stage1/app"}]},
            "html": {"files": [{cwd: "src/app/", src: "**/*.html", dest: "tmp/stage1/app"}]},
            "less": {"files": [{cwd: "src/app/", src: "**/*.less", dest: "tmp/stage1/app"}]}
        },
        jshint: {
            "app": {
                options: {
                    jshintrc: ".jshintrc"
                },
                gruntfile: ["Gruntfile.js"],
                src: [
                    "tmp/stage1/app/**/*.js"
                ]
            }
        },
        babel: {
            "app": {
                options: {
                    sourceMap: true,
                    "plugins": [
                        "transform-es2015-arrow-functions",
                        "transform-es2015-block-scoped-functions",
                        "transform-es2015-block-scoping",
                        "transform-es2015-classes",
                        "transform-es2015-computed-properties",
                        "check-es2015-constants",
                        "transform-es2015-destructuring",
                        "transform-es2015-for-of",
                        "transform-es2015-function-name",
                        "transform-es2015-literals",
                        "transform-es2015-object-super",
                        "transform-es2015-parameters",
                        "transform-es2015-shorthand-properties",
                        "transform-es2015-spread",
                        "transform-es2015-sticky-regex",
                        "transform-es2015-template-literals",
                        "transform-es2015-typeof-symbol",
                        "transform-es2015-unicode-regex",
                        "transform-regenerator"
                    ]
                },
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/stage1/app/',
                        src: ['**/*.js'],
                        dest: 'tmp/stage2/app/',
                        ext: ".js"
                    }
                ]
            }
        },
        uglify: {
            "app-boot": {
                src: ["tmp/stage2/app/boot.js",
                    "tmp/stage2/app/_trait/**/*.js",
                    "tmp/stage2/app/sv.js",
                    "tmp/stage2/app/data/**/*.js",
                    "tmp/stage2/app/dataObjects/**/*.js"],
                dest: "www/app/boot.js",
                options: {}
            },
            "app-core": {
                src: [
                    "tmp/stage2/app/**/*.js",
                    "!tmp/stage2/app/boot.js",
                    "!tmp/stage2/app/_trait/**/*.js",
                    "!tmp/stage2/app/sv.js",
                    "!tmp/stage2/app/data/**/*.js",
                    "!tmp/stage2/app/dataObjects/**/*.js"
                ],
                dest: "www/app/app.js",
                options: {}
            },
            options: {
                preserveComments: "none",
                report: "min"
            }
        },
        less: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: "tmp/stage1/app/",
                        src: ["**/*.less", "!common/bootstrapImports.less", "!common/constants.less"],
                        dest: "tmp/stage1/css/app/",
                        ext: ".css"
                    }
                ],
                options: {
                    paths: ["tmp/stage1/app"]
                }
            },
            options: {
                cleancss: true,
                ieCompat: true,
                report: "none"
            }
        },
        copy: {
            "app-static": {
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["*.*", "!index.template.html"],
                        dest: "www/"
                    }
                ],
                options: {}
            },
            "app-source": {
                files: [
                    {
                        expand: true,
                        cwd: "tmp/stage2/app",
                        src: ["**/*.js"],
                        dest: "www/app"
                    },
                    {
                        expand: true,
                        cwd: "testdrive/",
                        src: ["**/*.js"],
                        dest: "www/testdrive"
                    }
                ],
                options: {}
            },
            "app-sourcemap": {
                files: [
                    {
                        expand: true,
                        cwd: "tmp/stage2/app",
                        src: ["**/*.js.map"],
                        dest: "www/app"
                    },
                    {
                        expand: true,
                        cwd: "tmp/stage1/app",
                        src: ["**/*.js"],
                        dest: "www/map/app"
                    }
                ],
                options: {}
            },
            "app-assets": {
                files: [
                    {cwd: "src/assets/", src: ["**/*.*"], dest: "www/assets/", expand: true}
                ],
                options: {}
            },
            "app-css": {
                files: [
                    {cwd: "tmp/stage1/css/app", src: ["**/*.css"], dest: "www/css/app", expand: true}
                ],
                options: {}
            }
        },
        concat: {
            "app-boot": {
                src: ["copyright.txt", "www/app/boot.js"],
                dest: "www/app/boot.js"
            },
            "app-core": {
                src: ["copyright.txt", "www/app/app.js"],
                dest: "www/app/app.js"
            },
            "app-css": {
                src: ["copyright.txt", "tmp/stage1/css/app/**/*.css"],
                dest: "www/app/app.css"
            },
            "app-markup": {
                src: ["copyright.txt", "tmp/stage1/app/**/*.html"],
                dest: "www/app/app.html"
            }
        },
        replace: {
            "stage1-less": {
                src: [
                    "tmp/stage1/**/*.less"
                ],
                overwrite: true,
                replacements: [
                    {from: "node_modules/msg-js-spa-framework", to: "../node_modules/msg-js-spa-framework"}
                ]
            },
            "app-css": {
                src: [
                    "www/app/app.css"
                ],
                overwrite: true,
                replacements: [
                    {from: "url('/assets/", to: "url('../assets/"},
                    {from: "url(/assets/", to: "url(../assets/"}
                ]
            },
            "app-sourcemap": {
                cwd: "www/map/app",
                src: ["**/*.js.map"],
                overwrite: true,
                replacements: [
                    {from: "../tmp/stage1/app", to: "map/app"}
                ]
            }
        },
        "merge-json": {
            "i18n-de": {
                src: ["tmp/stage1/app/**/de.json"],
                dest: "www/app/de-translation.json"
            },
            "i18n-en": {
                src: ["tmp/stage1/app/**/en.json"],
                dest: "www/app/en-translation.json"
            },
            options: {
                space: ""
            }
        },
        watch: {
            "app-yaml": {files: ["src/app/**/*.yaml"], tasks: ["app", "copy"]},
            "appDev-yaml": {files: ["src/app/**/*.yaml"], tasks: ["appDev", "copy", "includeSource"]},
            "app-static": {files: ["src/*.*", "!src/index.template.html"], tasks: ["copy:app-static"]},
            "appDev-static": {files: ["src/*.*", "!src/index.html"], tasks: ["copy:app-static", "includeSource"]},
            "app-code": {files: ["src/app/**/*.js", "testdrive/app/**/*.js"], tasks: ["app-code", "copy:app-source", "copy:app-sourcemap"]},
            "appDev-code": {files: ["src/app/**/*.js", "testdrive/app/**/*.js"], tasks: ["appDev-code", "copy:app-source", "copy:app-sourcemap"]},
            "app-i18n": {files: ["src/app/**/*.json"], tasks: ["app-i18n"]},
            "appDev-i18n": {files: ["src/app/**/*.json"], tasks: ["app-i18n", "includeSource"]},
            "app-style": {files: ["src/app/**/*.less"], tasks: ["app-style", "copy:app-source", "copy:app-css"]},
            "appDev-style": {files: ["src/app/**/*.less"], tasks: ["app-style", "copy:app-source", "copy:app-css", "includeSource"]},
            "app-markup": {files: ["src/app/**/*.html"], tasks: ["app-markup", "copy:app-source"]},
            "appDev-markup": {files: ["src/app/**/*.html"], tasks: ["app-markup", "copy:app-source", "includeSource"]},
            "copy-statics": {files: ["src/*.*"], tasks: ["copy:app-static"]},
            "copy-assets": {files: ["src/assets/**/*.*"], tasks: ["copy:app-assets"]}
        },
        includeSource: {
            options: {
                basePath: 'www'
            },
            indexFile: {
                files: {
                    'www/index.html': 'src/index.template.html'
                }
            }
        }
    });

    grunt.registerTask("app-code", ["placeholder:app", "jshint:app", "babel:app", "uglify:app-boot", "uglify:app-core", "concat:app-boot", "concat:app-core", "replace:app-sourcemap"]);
    grunt.registerTask("appDev-code", ["placeholder:app", "jshint:app", "babel:app", "uglify:app-boot", "replace:app-sourcemap"]);
    grunt.registerTask("app-i18n", ["placeholder:i18n", "merge-json:i18n-de", "merge-json:i18n-en"]);
    grunt.registerTask("app-style", ["placeholder:less", "replace:stage1-less", "less:app", "concat:app-css", "replace:app-css"]);
    grunt.registerTask("app-markup", ["placeholder:html", "concat:app-markup"]);


    grunt.registerTask("app", ["app-code", "app-i18n", "app-style", "app-markup"]);
    grunt.registerTask("appDev", ["appDev-code", "app-i18n", "app-style", "app-markup"]);

};