module.exports = function (grunt) {

    /*  library specific actions and tasks */
    grunt.extendConfig({
        deliveryPacker: {
            "lib": {
                src: ["."],
                options: {
                    listbld: true,
                    listunused: true,
                    minimize: true,
                    outputFolder: "www/lib"
                }
            }
        }
    });
    
    grunt.registerTask("lib", ["deliveryPacker:lib"]);
};