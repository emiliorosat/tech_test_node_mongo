"use strict"

const mongoose = require("mongoose")
const schema = mongoose.Schema

const accountBalanceSchema = schema({
    createdDate: {
        type: String,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    spent:  {
        type: Number,
        required: true
    },
    income:  {
        type: Number,
        required: true
    }
})

module.exports = accountBalanceSchema
