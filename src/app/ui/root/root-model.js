cs.ns('___config.package___')
___config.package___.model = cs.clazz({
    extend: app.fw.root.model,
    mixin: [
        app.trait.root.businessservices.model
    ],
    dynamics: {},
    protos: {

        create () {
            this.base()
            cs(this).model({
                "global:data:currentUser": {value: null, valid: "object"},
                "global:data:userLanguage": {value: "de", valid: "string", store: true}
            })
        }
    }
})