import insertUserModel from "../../models/users/insertUserModel.js"
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js"

import newUserSchema from "../../schemas/newUserSchema.js"
import validateSchema from "../../scripts/validateSchema.js"

import generateError from "../../scripts/generateError.js"
import saveImage from "../../scripts/saveImage.js"

const newUserController = async (req, res, next) => {
    try {
        let newUserData = req.body
        newUserData.avatar = req.files?.avatar

        const registration_code = "patata"
        let avatarName
        const sameEmailUsers = await selectUserByEmailModel(req.body.email)

        if (sameEmailUsers.length > 0) {
            throw generateError(409, "Ese email ya está registrado")
        }

        await validateSchema(newUserSchema, newUserData)

        if (req.files) {
            avatarName = await saveImage(req.files?.avatar)
            newUserData.avatar = avatarName
        }

        await insertUserModel(newUserData, registration_code)

        res.status(200).send({ status: "ok", message: "Usuario creado" })
    } catch (error) {
        next(error)
    }
}
export default newUserController
