let accountBalance = require("../models/accountBalance.model")
let responseModel = require("../models/response.model")
const encrypt = require("../helpers/bcrypt.helper")

const get = async function(req, res, next){
    let response = responseModel
    try{
        
        accountBalance.find({}, function(err, users){
            if(err){
                response.message = "Error al obtener registros de balance"
                response.data = null
                response.success = false
                return res.status(500).json(response)
            }
            if(!users || users.length <= 0){
                response.message = "No existen registros"
                response.data = null
                response.success = false
                return res.status(404).json(response)
            }
            
            response.message = "ok"
            response.success = true
            response.data = users
            return res.status(200).json(response)
        })

    }catch(err){
        next(err)
    }
    
}



const add = async function(req, res){
    let response = responseModel
    let _accountBalance = new accountBalance()

    try{

        const {concept, spent, income, createdDate} = req.body
        
        _accountBalance.createdDate = createdDate
        _accountBalance.concept = concept
        _accountBalance.spent = spent
        _accountBalance.income = income

        await _accountBalance.validate()
      
        _accountBalance.save(function(err, newUser){

                if(err){
                    response.message = "Error al agregar registro"
                    response.data = null
                    response.success = false
                    return res.status(500).json(response)
                }

                if(!newUser){
                    response.message = "No se pudo agregar un nuevo registro"
                    response.data = null
                    response.success = false
                    return res.status(404).json(response)
                }

                response.message = "creado correctamente"
                response.success = true
                response.data = newUser
                return res.status(201).json(response)
            })


    }catch(err){
        next(err)
    }
}

module.exports = {
    get, add
}
