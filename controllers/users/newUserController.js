import insertUserModel from "../../models/users/insertUserModel.js"
import newUserSchema from "../../schemas/newUserSchema.js"
import validateSchema from "../../scripts/validateSchema.js"
const newUserController = async (req, res, next) => {
    try {
        const newUserData = await req.body
        const registration_code = "patata"

        await validateSchema(newUserSchema, req.body)

        await insertUserModel(newUserData, registration_code)
        res.status(200).send({ status: "ok", message: "Usuario creado" })
    } catch (error) {
        next(error)
    }
}
export default newUserController
