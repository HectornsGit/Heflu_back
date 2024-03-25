import insertUserModel from "../../models/users/insertUserModel.js"

const newUserController = async (req, res, next) => {
    try {
        const { name, email, bio, avatar, password } = req.body
        const registrationCode = "patata"

        await insertUserModel(
            name,
            email,
            bio,
            avatar,
            password,
            registrationCode
        )
    } catch (error) {
        next(error)
    }
    res.send({ status: "ok", message: "Usuario creado" })
}
export default newUserController
