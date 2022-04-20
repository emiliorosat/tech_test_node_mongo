const bcrypt = require("bcrypt")

const salt = 10

const hash = async function(password){
    return await bcrypt.hash(password, salt)
}

const compare = async function(password, hash){
    return await bcrypt.compare(password, hash)
}

module.exports = {hash, compare}