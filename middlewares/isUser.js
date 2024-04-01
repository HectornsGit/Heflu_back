import generateError from "../scripts/generateError.js"

//Con este middleware comprueba si este usuario está autorizado y genera un error si no lo está.
const isUser = (req, res, next) => {
    try {
        if (req.user) return next()
        throw generateError(401, "No puedes acceder")
    } catch (error) {
        next(error)
    }
}
export default isUser
