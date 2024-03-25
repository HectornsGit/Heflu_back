import express from "express"

const router = express.Router()

router.post("/", (req, res, next) => {
    res.send({ message: "200 OK" })
})

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
