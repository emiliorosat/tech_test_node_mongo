"use strict"

const router = require("express").Router()
const accountBalance = require("../../controllers/accountBalance.controller.v1")



router.get("/account-balance", accountBalance.get)

router.post("/account-balance", accountBalance.add)



module.exports = router