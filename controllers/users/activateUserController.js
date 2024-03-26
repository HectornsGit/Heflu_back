import jwt from "jsonwebtoken"

import { SECRET } from "../../config/env.js"

import activateUserModel from "../../models/users/activateUserModel.js"
import generateError from "../../scripts/generateError.js"

const activateUserController = async (req, res, next) => {
    try {
        const registration_code = req.params.registration_code
        console.log(req.params)
        const activatedUser = await activateUserModel(registration_code)

        if (activatedUser === undefined) {
            throw generateError(
                "El usuario ya está activado o el código es incorrecto"
            )
        }

        const payload = {
            id: activatedUser.id,
            username: activatedUser.username,
        }

        const token = jwt.sign(payload, SECRET, {
            expiresIn: "30d",
        })

        res.send({
            status: "ok",
            message: "Cuenta activada correctamente",
            token,
        })
    } catch (err) {
        next(err)
    }
}

export default activateUserController
