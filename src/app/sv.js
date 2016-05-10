/*
 **  Service Component for all service based operations
 */
app.sv = cs.clazz({
    extend: app.fw.sv,
    mixin: [
        app.trait.sv.root.backendservices
    ],
    dynamics: {},
    protos: {}
});