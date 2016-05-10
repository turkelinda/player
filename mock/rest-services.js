"use strict"
let rest = require('connect-rest')
global.moment = require('moment')

//
//   S E R V I C E   F U N C T I O N S
//

//
//   C O N T E X T   D E F I N I T I O N
//
rest.context(global.restContext)

//
//   S E R V I C E   R E G I S T R A T I O N
//

module.exports.rest = rest