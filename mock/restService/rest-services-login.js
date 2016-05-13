"use strict";
const utils = require('../utils/rest-services-utils.js')

module.exports = (() => {

    //
    //   S E R V I C E   F U N C T I O N S
    //
    const services = {}

    services.whoamiService = function (request, content, callback) {
        let result = {name: "test"}//utils.getCurrentUserFromRequest(request)
        const resultParams = { statusCode: 200 }
        if (!result) {
            result = {}
            resultParams.statusCode = 401
        }
        return callback(null, result, resultParams)
    };

    return services
})()