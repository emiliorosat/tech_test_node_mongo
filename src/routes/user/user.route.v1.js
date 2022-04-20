"use strict"

const router = require("express").Router()
const user = require("../../controllers/user.controller.v1")

router.get("/user/:id", user.getById)

router.get("/user", user.get)

router.post("/user", user.add)

router.put("/user/:id", user.update)

router.delete("/user/:id", user.remove)

module.exports = router