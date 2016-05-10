/*  use "cs" namespace for ComponentJS
 and "app" namespace for ourself  */
cs = ComponentJS;
cs.ns("app");

app.dm = datamodeljs.dm("default");

/* root URL for service calls, might change if mockserver should be used */
app.serviceRoot = "../backend";

app.HashManager = (function () {

    var api = {};

    api.parseURL = function (url) {
        return new HashManager(url);
    };

    var hashIndex = function (hashes, key) {
        return _.findIndex(hashes, function (hash) {
            return hash.indexOf(key + "=") === 0 || hash === key;
        });
    };

    var HashManager = function (url) {
        this.url = url;
        this.hashes = [];
        this.parseURL();
    };

    HashManager.prototype.parseURL = function () {
        if (typeof this.url === "string") {
            var urlParts = this.url.split("#");
            this.hashes = urlParts.length > 1 ? urlParts[1].split("_") : [];
        }
    };

    HashManager.prototype.hasHash = function (key) {
        return hashIndex(this.hashes, key) !== -1;
    };

    HashManager.prototype.hash = function (key, value) {
        var idx = hashIndex(this.hashes, key);
        if (value === undefined) { // read the hash value
            if (idx !== -1) {
                var split = this.hashes[idx].split("=");
                return split.length > 1 ? split[1] : null;
            } else {
                return undefined;
            }
        } else {
            if (value === null) {
                if (idx !== -1) { // remove the hash key
                    this.hashes.splice(idx, 1);
                }
            } else { // set the hash key
                if (idx !== -1) {
                    this.hashes[idx] = key + "=" + value;
                } else {
                    this.hashes.push(key + "=" + value);
                }
            }
        }
    };

    HashManager.prototype.toString = function () {
        return "#" + _.filter(this.hashes, function (each) {
                return !!each
            }).join("_");
    };

    return api;

}());

app.handleHashes = function (e) {
    var url = e && e.newURL ? e.newURL : "";
    if (url === "" && window && window.location)
        url = window.location.hash;

    var hashManager = app.HashManager.parseURL(url);

    // Debugger on/off
    if (cs.plugin("debugger")) {
        var csdebugEnabled = hashManager.hasHash("csdebug");
        cs.debug(csdebugEnabled ? 9 : 0);
        cs.debug_window({
            enable: csdebugEnabled,
            natural: true,
            autoclose: true,
            name: "APP Component Debugger",
            width: 800,
            height: 1000
        })
    }

    // App mode - bootstrap app mode based on hash tags - defaults to prod
    var oldMode = app.mode;
    if (hashManager.hasHash("dev")) {
        app.mode = "dev"
    } else if (hashManager.hasHash("bugfix")) {
        app.mode = "bugfix"
    } else {
        app.mode = "prod"
    }
    // App mode changed during runtime - we are forced to reload the app
    if (oldMode && oldMode !== app.mode) {
        app.reload();
    }

    // Reset app local storage if hash tags state to reset
    if (hashManager.hasHash("reset") && window && window.localStorage) {
        for (var key in window.localStorage) {
            window.localStorage.removeItem(key)
        }
    }

    // bootstrap logging if hash tag state to enable more detailed logs
    app.logging = hashManager.hasHash("log");

};

app.boot = function () {
    /*  bootstrap ComponentJS internals  */
    cs.bootstrap();
    cs.transition(null);
    cs.transition("created", "create", "destroy", "#cc3333");
    cs.transition("configured", "setup", "teardown", "#eabc43");
    cs.transition("prepared", "prepare", "cleanup", "#f2ec00");
    cs.transition("materialized", "render", "release", "#6699cc");
    cs.transition("visible", "show", "hide", "#669933");
    cs.transition("ready", "ready", "unready", "#669933");

    app.handleHashes();

    // allow headless unit tests to define a different host. Inside browser requests go to same domain
    if (app.host === undefined)
        app.host = "";

};

app.log = function () {
    if (app.logging)
        console.log.apply(console, Array.prototype.slice.call(arguments))
};

app.reload = function () {
    if (window && window.location)
        window.location.reload(true);
};

app.shutdown = function () {
    cs("/sv").destroy();
    cs("/root").destroy();
};

/*  create root component and make it visible  */
app.main = function () {
    var sv = cs.create("/sv", app.sv);
    if (app.mode === "dev") app.serviceRoot = "mockdata";
    sv.call("setServiceRoot", app.serviceRoot);
    cs("/sv").state("prepared", function () {
        cs.create("/root", app.root.ctrl);
        cs("/root").state(typeof document !== "undefined" ? "ready" : "prepared", function () {
            $(".splash", "body").hide();
        })
    })
};