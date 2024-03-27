import { SECRET } from "../config/env"
import generateError from "../scripts/generateError"
import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization === false) return next()

        let tokenInfo

        try {
            tokenInfo = jwt.verify(authorization, SECRET)
        } catch {
            throw generateError(401, "Token incorrecto")
        }

        req.user = tokenInfo
        next()
    } catch (error) {
        next(error)
    }
}

export default isAuth
