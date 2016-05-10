/* global global: false */
module.exports = function (grunt) {

    /* connect, server, proxy and watch specific actions and tasks */
    global.restContext = '/mockdata';
    var rest = require("../mock/rest-services.js").rest;
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    var serverList = {
        "TEST": {host: 'unknown.msg.de', port: 8080},
        "PROD": {host: 'unknown.msg.de', port: 8081}
    };

    var targetServer = serverList.TEST;

    grunt.extendConfig({
        connect: {
            server: {
                options: {
                    hostname: "*",
                    port: 5678,
                    base: ["www"],
                    middleware: function (connect, options) {
                        return [
                            connect.logger({format: "dev"}),
                            proxySnippet,
                            connect.static(options.base[0], {maxAge: 0, redirect: true}),
                            connect.directory(options.base[0]),
                            function (req, res, next) {
                                res.setHeader('Pragma', 'no-cache');
                                res.setHeader('Expires', '0');
                                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                                res.setHeader('User-Cache-Control', 'no-cache, no-store, must-revalidate');
                                next();
                            },
                            connect.bodyParser(),
                            rest.rester(),
                            connect.errorHandler()
                        ];
                    }
                }
            },
            proxies: [
                {
                    context: '/backend',
                    host: targetServer.host,
                    port: targetServer.port,
                    https: false,
                    changeOrigin: false,
                    rewrite: {
                        "^/backend": "/backend"
                    }
                }
            ]
        },
        watch: {
            options: {
                nospawn: true,
                livereload: 35729
            }
        },
        focus: {
            watchProd: {
                include: ["app-static", "app-yaml", "app-code", "app-i18n", "app-style", "app-markup",
                    "copy-assets", "lib"]
            },
            watchDev: {
                include: ["appDev-static", "appDev-yaml", "appDev-code", "appDev-i18n", "appDev-style", "appDev-markup",
                    "copy-assets", "libDev"]
            }
        }
    });

    grunt.registerTask("serverDev", ["configureProxies", "connect:server", "focus:watchDev"]);
    grunt.registerTask("server", ["configureProxies", "connect:server", "focus:watchProd"]);

};