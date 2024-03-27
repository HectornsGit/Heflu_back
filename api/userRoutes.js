import express from "express"

import newUserController from "../controllers/users/newUserController.js"
import activateUserController from "../controllers/users/activateUserController.js"
import loginUserController from "../controllers/users/loginUserController.js"

const router = express.Router()

router.post("/", newUserController)

router.get("/validate/:registration_code", activateUserController)

router.post("/login", loginUserController)

router.get("/:id", (req, res, next) => {
    res.send({ message: "200 OK" })
})

export default router
