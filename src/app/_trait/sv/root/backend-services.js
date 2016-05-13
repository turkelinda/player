cs.ns("___config.package___");
___config.package___.backendservices = cs.trait({
    dynamics: {
        whoamiService: '%s/loginController/whoAmI',
        userHeader: null
    },
    protos: {

        prepare () {
            this.base();

            // Login und Anmeldeprüfung
            // EXAMPLE
            this.registerService("POST", "whoAmI", (callback) => {
                const serviceURL = sprintf(this.whoamiService, this.serviceRoot);
                return {serviceURL: serviceURL, callback: callback};
            }, (error, text, xhr, callback) => {
                if (error) {
                    this.handleTechnicalError(text, xhr, callback);
                } else {
                    let objs = text.length > 0 ? JSON.parse(text) : {};
                    if (this.hasError(objs)) {
                        this.handleFunctionalError(objs, callback);
                    } else {
                        this.userHeader = xhr.getResponseHeader('appuser');
                        callback(this.SUCCESS, objs);
                    }
                }
            });

        }
    }
});
