import express from "express"
import isUser from "../middlewares/isUser.js"
import newUserController from "../controllers/users/newUserController.js"
import activateUserController from "../controllers/users/activateUserController.js"
import loginUserController from "../controllers/users/loginUserController.js"
import getUserController from "../controllers/users/getUserController.js"

const router = express.Router()

router.post("/", newUserController)

router.get("/validate/:registration_code", activateUserController)

router.post("/login", loginUserController)

router.get("/:id", isUser, getUserController)

export default router
