"use strict"

const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = schema({
    createdDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName:  {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    role: String
})

module.exports = userSchema