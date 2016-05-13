"use strict"
let rest = require('connect-rest')

//
//   S E R V I C E   F U N C T I O N S
//

//const userSV = require('./restService/rest-services-users')
const loginSV = require('./restService/rest-services-login')

//
//   C O N T E X T   D E F I N I T I O N
//
rest.context(global.restContext)

//
//   S E R V I C E   R E G I S T R A T I O N
//

// Login und Anmeldeprüfung
rest.post('/loginController/whoAmI', loginSV.whoamiService)


module.exports.rest = rest