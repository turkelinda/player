cs.ns('___config.package___');
___config.package___.view = cs.clazz({
    extend: app.fw.root.view,
    dynamics: {
        markupName: '___config.id___',
        container: null,
        header: null,
        main: null,
        useDefaultPlug: false
    },
    protos: {

        render () {
            this.base();

            this.ui.appendTo(this.container);

            /*  let children plug into defined sockets */
            cs(this).socket({scope: "header", ctx: this.header, spool: cs(this).state()});
            cs(this).socket({ctx: this.container, spool: cs(this).state()});

            $(".splash", "body").hide();
        },

        release () {
            this.base();
            this.ui.detach();
        },

        prepareMaskReferences () {
            this.base();
            this.container = $('body');
            this.header = $('.appHeaderCont', this.ui);
            this.main = $('.appMainCont', this.ui);
        }

    }
});