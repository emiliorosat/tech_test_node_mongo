"use strict"

const accountBalanceRouteVersion1 = require("./accountBalance.route.v1")

module.exports = app => {
    app.use("/api/v1", accountBalanceRouteVersion1)
}