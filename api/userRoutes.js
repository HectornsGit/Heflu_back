import express from "express"

const router = express.Router()

router.post("/users", (req, res, next) => {
    return "200 OK"
})

router.post("/users/validate/:regCode", (req, res, next) => {
    return "200 OK"
})

router.post("/users/login", (req, res, next) => {
    return "200 OK"
})

router.get("/users/:id", (req, res, next) => {
    return "200 OK"
})

export default router
