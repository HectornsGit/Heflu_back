import bcrypt from "bcrypt"
import { randomUUID } from "crypto"

import insertUserModel from "../../models/users/insertUserModel.js"
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js"

import newUserSchema from "../../schemas/newUserSchema.js"
import validateSchema from "../../scripts/validateSchema.js"

import generateError from "../../scripts/generateError.js"
import saveImage from "../../scripts/saveImage.js"
import sendRegistrationCodeEmail from "../../scripts/sendRegistrationCodeEmail.js"

const newUserController = async (req, res, next) => {
    try {
        let newUserData = req.body

        newUserData.avatar = req.files?.avatar
        let avatarName

        const registration_code = randomUUID()

        //---- Comprobamos si está ya registrado ----//
        const sameEmailUsers = await selectUserByEmailModel(req.body.email)
        if (sameEmailUsers.length > 0) {
            throw generateError(409, "Ese email ya está registrado")
        }

        //---- Esquemas de JOI.----//
        await validateSchema(newUserSchema, newUserData)

        //----Encriptado de la contraseña ----//
        newUserData.password = await bcrypt.hash(newUserData.password, 10)

        //---- Guardado de la imagen en el servidor ----///
        if (req.files) {
            avatarName = await saveImage(req.files?.avatar)
            console.log(avatarName)
            newUserData.avatarName = avatarName
        }

        //---- Inserción en la base de datos ----////
        await insertUserModel(newUserData, registration_code)

        //TO DO: Send registration_code
        sendRegistrationCodeEmail(newUserData.email, registration_code)

        res.status(200).send({ status: "ok", message: "Usuario creado" })
    } catch (error) {
        next(error)
    }
}
export default newUserController
