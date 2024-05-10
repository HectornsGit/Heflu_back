import { SECRET } from "../config/env.js"
import generateError from "../scripts/generateError.js"
import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return next()

        let tokenInfo

        try {
            tokenInfo = jwt.verify(authorization, SECRET)
        } catch {
            if (authorization == "null") {
                throw generateError(
                    401,
                    "Tienes que ingresar para realizar esa acción"
                )
            }
            throw generateError(401, "Token incorrecto")
        }

        req.user = tokenInfo
        next()
    } catch (error) {
        next(error)
    }
}

export default isAuth
