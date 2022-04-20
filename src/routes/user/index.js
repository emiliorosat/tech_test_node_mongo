"use strict"

const userRouteVersion1 = require("./user.route.v1")

module.exports = app => {
    app.use("/api/v1", userRouteVersion1)
}