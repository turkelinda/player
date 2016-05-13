module.exports = function (grunt) {

    /* cleanup */
    grunt.extendConfig({
        clean: {
            clean: ["tmp/*", "tmp", "www/*", "www"],
            distclean: ["node_modules"],
            options: {
                force: true
            }
        }
    });
};