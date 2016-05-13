cs.ns('___config.package___')
___config.package___.ctrl = cs.trait({
    protos: {

        setup () {
            this.base()

            //TODO fil with subscriber
            //Example:
            /*this.subscribeDataService('readOrders', (result) => {
            // import business data in data manager
                return app.util.EntityCreateUtil.importOrders(result)
            })*/

        }
    }
})