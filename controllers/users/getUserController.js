import generateError from "../../scripts/generateError.js"
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js"
import selectPropertiesByOwnerIdModel from "../../models/properties/selectPropertiesByOwnerIdModel.js"

const getUserController = async (req, res, next) => {
    const { id } = req.params
    try {
        const [user] = await selectUserByIdModel(id)

        if (user === undefined) {
            throw generateError(404, "El usuario no se ha encontrado")
        }

        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
            created_at: user.created_at,
            media_rating: user.media_rating,
        }
        const userProperties = await selectPropertiesByOwnerIdModel(id)

        res.status(200).send({
            data: { user: userData, properties: userProperties },
        })
    } catch (error) {
        next(error)
    }
}

export default getUserController
