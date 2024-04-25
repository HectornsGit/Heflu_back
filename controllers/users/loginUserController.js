import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateError from "../../scripts/generateError.js"
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js"
import { SECRET } from "../../config/env.js"
const loginUserController = async (req, res, next) => {
    // Recibe usuario contraseña
    const { email, password } = req.body
    try {
        // Comprueba que el usuario existe y obtiene su contraseña
        const [user] = await selectUserByEmailModel(email)

        if (user === undefined) {
            throw generateError(
                401,
                "El email o contraseña introducidos son incorrectos"
            )
        }

        const validPassword = await bcrypt.compare(password, user.password)

        // Comprueba la contraseña
        if (validPassword === false) {
            throw generateError(
                401,
                "El email o contraseña introducidos son incorrectos"
            )
        }
        // Genera el token
        const payload = { id: user.id, name: user.name }
        const token = jwt.sign(payload, SECRET, { expiresIn: "30d" })

        // Devuelve el token
        res.status(200).send({
            status: "ok",
            message: "Conectado correctamente",
            data: { token },
        })
    } catch (error) {
        next(error)
    }
}

export default loginUserController
