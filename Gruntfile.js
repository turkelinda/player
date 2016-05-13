module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json")
    });

    /*  load all grunt tasks defined in package.json */
    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "delivery-packer"]});

    grunt.loadTasks("buildTasks");

    /*  register all project specific tasks */
    grunt.registerTask("default", ["dev"]);
    grunt.registerTask("dev", ["clean:clean", "buildDev", "includeSource", "serverDev"]);
    grunt.registerTask("buildDev", ["libDev", "appDev", "copy"]);
    grunt.registerTask("prod", ["clean:clean", "build", "server"]);
    grunt.registerTask("build", ["lib", "app", "copy"]);

};