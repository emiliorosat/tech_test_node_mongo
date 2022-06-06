"use strict"
const mongoose = require("mongoose")
const accountBalanceSchema = require("../schemas/accountBalanceSchema.schema")

module.exports = mongoose.model("account-balance", accountBalanceSchema)