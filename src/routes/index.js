"use strict"

const userRoute = require("./user")
const accountBalanceRoute = require('./accountBalance')

const routes = (app)=>{
    userRoute(app)
    accountBalanceRoute(app)

}

module.exports = routes