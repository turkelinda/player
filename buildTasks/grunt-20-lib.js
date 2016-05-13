module.exports = function (grunt) {

    /*  library specific actions and tasks */
    grunt.extendConfig({
        deliveryPacker: {
            "dev": {
                src: ["deliveryDev.yaml"],
                options: {
                    listreg: true,
                    listbld: true,
                    listunused: true,
                    outputFolder: "www/map/lib"
                }
            },
            "prod": {
                src: ["."],
                options: {
                    listreg: true,
                    listbld: true,
                    listunused: true,
                    minimize: true,
                    outputFolder: "www/lib"
                }
            }
        }
    });

    grunt.registerTask("libDev", ["deliveryPacker:dev"]);
    grunt.registerTask("lib", ["deliveryPacker:prod"]);
};
