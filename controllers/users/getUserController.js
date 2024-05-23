import generateError from "../../scripts/generateError.js"
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js"
import selectPropertiesByOwnerIdModel from "../../models/properties/selectPropertiesByOwnerIdModel.js"
import selectPropertyDetailsModel from "../../models/properties/selectPropertyDetailsModel.js"

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
        if (userProperties.length > 0) {
            const userPropertyIds = userProperties.map(
                (property) => property.id
            )

            const userPropertiesDetails =
                await selectPropertyDetailsModel(userPropertyIds)

            // Cambiar formato de las imágenes a un array
            let formattedProperties = []

            for (let property of userPropertiesDetails) {
                property.property_images = property.property_images.split(",")
                formattedProperties.push(property)
            }

            return res.status(200).send({
                data: { user: userData, properties: formattedProperties },
            })
        }
        return res
            .status(200)
            .send({ data: { user: userData, properties: [] } })
    } catch (error) {
        next(error)
    }
}

export default getUserController
