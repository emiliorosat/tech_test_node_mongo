"use strict"

const express = require('express')
const env = require("dotenv")
const routes = require("./routes")
const cors = require('cors')

const app = express()
env.config()

const port = process.env.PORT ?? 3000
const db = process.env.DB_SERVE
const dbName = process.env.DB_NAME

app.set('dbServe', db)
app.set('dbName', dbName)
app.set('port', port)

app.use(express.json())
app.use(cors({origin: '*'}))


routes(app)

app.get('/api', (req, res)=> res.send("Api Online") )

module.exports = app