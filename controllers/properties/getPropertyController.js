import selectPropertiesDetailsModel from "../../models/properties/selectPropertyDetailsModel.js"
import selectAllUserReviewsModel from "../../models/reviews/selectAllUserReviewsModel.js"
import generateError from "../../scripts/generateError.js"

const getAllPropertiesController = async (req, res, next) => {
    try {
        const [property] = await selectPropertiesDetailsModel(req.params.id)

        // Si viene vacío, lanzamos un error
        if (!property) {
            throw generateError(404, "No se ha encontrado la propiedad")
        }
        // Cambiar formato de las imágenes a un array
        let formattedProperty = { ...property }

        formattedProperty.property_images = property.property_images.split(",")

        // Con la información de la propiedad, sacamos las valoraciones del propietario
        const reviews = await selectAllUserReviewsModel(property.owner_id)
        // TO DO: gestionar si viene vacío

        // Añadir array de reviews
        formattedProperty.reviews = reviews

        res.status(200).send({
            status: "ok",
            data: formattedProperty,
        })
    } catch (err) {
        next(err)
    }
}

export default getAllPropertiesController
