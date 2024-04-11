import selectFilterPropertiesByDatesModel from "../../models/properties/selectFilterPropertiesByDatesModel.js"
import selectFilterPropertiesModel from "../../models/properties/selectFilterPropertiesModel.js"
import generateError from "../../scripts/generateError.js"

const getFilterPropertiesController = async (req, res, next) => {
    try {
        const params = {
            country: req.query.country,
            maxPrice: req.query.maxPrice,
            minRooms: req.query.minRooms,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
        }

        const filterPropertiesByDate =
            await selectFilterPropertiesByDatesModel(params)
        const ids = filterPropertiesByDate.map(
            (property) => property.property_id
        )

        const filterProperties = await selectFilterPropertiesModel(params, {
            ids,
        })

        res.status(200).send({
            status: "ok",
            data: filterProperties,
        })
    } catch (err) {
        next(err)
    }
}

export default getFilterPropertiesController
