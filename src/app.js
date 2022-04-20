"use strict"

const express = require('express')
const env = require("dotenv")
const routes = require("./routes")

const app = express()
env.config()

const port = process.env.SERVE_PORT ?? 3000
const db = process.env.DB_SERVE
const dbName = process.env.DB_NAME

app.set('dbServe', db)
app.set('dbName', dbName)
app.set('port', port)

app.use(express.json())

routes(app)
module.exports = app