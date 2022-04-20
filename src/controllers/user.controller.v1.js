let user = require("../models/user.model")
let responseModel = require("../models/response.model")
const encrypt = require("../helpers/bcrypt.helper")

const get = async function(req, res, next){
    let response = responseModel
    try{
        
        user.find({}, function(err, users){
            if(err){
                response.message = "Error al obtener usuarios"
                response.data = null
                response.success = false
                return res.status(500).json(response)
            }
            if(!users || users.length <= 0){
                response.message = "No existen usuarios"
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


const getById = async function(req, res, next){
    let response = responseModel

    try{
        const id = req.params.id

        user.findById(id, function(err, _user){
            if(err){
                response.message = "Error al buscar usuario"
                response.data = null
                response.success = false
                return res.status(500).json(response)
            }
            if(!_user){
                response.message = "Usuario no existe"
                response.data = null
                response.success = false
                return res.status(404).json(response)
            }
            response.message = "ok"
            response.data = _user
            response.success = true

            return res.status(200).json(response)
        })

    }catch(err){
        next(err)
    }
    
}
const add = async function(req, res){
    let response = responseModel
    let _user = new user()

    try{

        const {email, firstName, lastName, password, role} = req.body
        hashedPassword = await encrypt.hash(password)
        
        _user.createdDate = Date.now()
        _user.email = email
        _user.firstName = firstName
        _user.lastName = lastName
        _user.password = hashedPassword
        _user.role = role

        await _user.validate()

        user.find({email}, function(err, users){
            if(err){
                response.message = "Error al consultar usuarios"
                response.data = null
                response.success = false
                return res.status(500).json(response)
            }

            if(users.length >= 1){
                response.message = "Este usuario ya está registrado"
                response.data = null
                response.success = false
                return res.status(200).json(response)
            }

            _user.save(function(err, newUser){

                if(err){
                    response.message = "Error al crear usuario"
                    response.data = null
                    response.success = false
                    return res.status(500).json(response)
                }

                if(!newUser){
                    response.message = "No se pudo crear el usuario"
                    response.data = null
                    response.success = false
                    return res.status(404).json(response)
                }

                response.message = "creado correctamente"
                response.success = true
                response.data = newUser
                return res.status(201).json(response)
            })

        })        

    }catch(err){
        next(err)
    }
}
const update = async function(req, res, next){
    let response = responseModel

    try{
        const id = req.params.id
        const updatedUser = req.body
        
        user.findByIdAndUpdate(id, updatedUser, {new: true}, function(err, currentUser){
            if(err){
                response.message = "Error al actualizar usuario"
                response.data = null
                response.success = false
                return res.status(500).json(response)
            }
            if(!currentUser){
                response.message = "El usuario no existe"
                response.data = null
                response.success = false
                return res.status(404).json(response)
            }
            response.message = "actualizado correctamente"
            response.success = true
            response.data = currentUser
            return res.status(200).json(response)
        })


    }catch(err){
        next(err)
    }
}
const remove = async function(req, res){
    let response = responseModel

    try{
        const id = req.params.id

        user.findByIdAndRemove(id, function(err, _user){
            if(err){
                response.message = "Error al eliminar usuario"
                response.data = null
                response.success = false
                return res.status(500).json(response)
            }
            if(!_user){
                response.message = "Usuario no existe"
                response.data = null
                response.success = false
                return res.status(404).json(response)
            }
            response.message = "eliminado correctamente"
            response.data = _user
            response.success = true

            return res.status(200).json(response)
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    get, getById, add, update, remove
}