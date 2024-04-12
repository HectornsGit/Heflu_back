import selectAllPropertiesModel from "../../models/properties/selectAllPropertiesModel.js"
import selectFilterPropertiesByDatesModel from "../../models/properties/selectFilterPropertiesByDatesModel.js"
import selectFilterPropertiesModel from "../../models/properties/selectFilterPropertiesModel.js"
import selectPropertyDetailsModel from "../../models/properties/selectPropertyDetailsModel.js"
import generateError from "../../scripts/generateError.js"

const getAllPropertiesController = async (req, res, next) => {
    try {
        const params = {
            country: req.query.country,
            maxPrice: req.query.maxPrice,
            minRooms: req.query.minRooms,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
        }

        let properties = []

        if (!Object.keys(req.query).length > 0) {
            properties = await selectAllPropertiesModel()
        } else {
            const filterPropertiesByDate =
                await selectFilterPropertiesByDatesModel(params)
            const ids = filterPropertiesByDate.map(
                (property) => property.property_id
            )

            const filterProperties = await selectFilterPropertiesModel(
                params,
                ids
            )

            if (filterProperties.length < 1) {
                throw generateError(404, "No se han encontrado propiedades")
            }

            const propertyIds = filterProperties.map((property) => property.id)

            const filterPropertiesDetails =
                await selectPropertyDetailsModel(propertyIds)

            properties = filterPropertiesDetails
        }

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
