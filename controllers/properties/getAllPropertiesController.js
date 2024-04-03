import selectAllPropertiesModel from "../../models/properties/selectAllPropertiesModel.js"
import generateError from "../../scripts/generateError.js"

const getAllPropertiesController = async (req, res, next) => {
    try {
        const properties = await selectAllPropertiesModel()

        // Si viene vacío, lanzamos un error
        if (properties.lenght < 1) {
            throw generateError(404, "No se han encontrado propiedades")
        }

        // Cambiar formato de las imágenes a un array
        let formattedProperties = []

        for (let property of properties) {
            property.property_images = property.property_images.split(",")
            formattedProperties.push(property)
        }

        res.status(200).send({
            status: "ok",
            data: formattedProperties,
        })
    } catch (err) {
        next(err)
    }
}

export default getAllPropertiesController
