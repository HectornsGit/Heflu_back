import express from "express"

import newUserController from "../controllers/users/newUserController.js"
import activateUserController from "../controllers/users/activateUserController.js"

const router = express.Router()

router.post("/", newUserController)

router.get("/validate/:registration_code", activateUserController)

router.post("/login", (req, res, next) => {
    res.send({ message: "200 OK" })
})

router.get("/:id", (req, res, next) => {
    res.send({ message: "200 OK" })
})

export default router
