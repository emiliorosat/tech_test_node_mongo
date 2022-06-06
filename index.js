const app = require('./src/app')
const mongo = require("mongoose")

const dbServe = app.get("dbServe")
const dbName = app.get("dbName")

//console.log("database server ", dbServe)
//console.log("database name ", dbName)

mongo.Promise = global.Promise
mongo.connect(`${dbServe}/${dbName}?retryWrites=true&w=majority`).then(()=>{
    console.log("MongoDB connected OK")

    app.listen(app.get('port'),()=>{
        console.log(`Server is running on port: ${app.get("port")}`)
    })
    
}).catch((err)=>{
    console.error(err.message)
})

