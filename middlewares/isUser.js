import generateError from "../scripts/generateError"

//Con este middleware comprueba si este usuario está autorizado y genera un error si no lo está.
const isUser = (req, res, next) => {
    if (req.user) return next()
    generateError(401, "No puedes acceder")
}
export default isUser
