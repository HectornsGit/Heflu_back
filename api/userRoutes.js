import express from "express"

import newUserController from "../controllers/users/newUserController.js"

const router = express.Router()

router.post("/", newUserController)

router.post("/validate/:regCode", (req, res, next) => {
    res.send({ message: "200 OK" })
})

router.post("/login", (req, res, next) => {
    res.send({ message: "200 OK" })
})

router.get("/:id", (req, res, next) => {
    res.send({ message: "200 OK" })
})

export default router
