import insertImageModel from "../../models/images/insertImageModel.js"
import insertPropertyModel from "../../models/properties/insertPropertyModel.js"
import insertImagePropertyModel from "../../models/properties_images/insertPropertyImageModel.js"
import selectProperyDetailsModel from "../../models/properties/selectPropertyDetailsModel.js"

import validateSchema from "../../scripts/validateSchema.js"
import newPropertySchema from "../../schemas/newPropertySchema.js"
import imgSchema from "../../schemas/imgSchema.js"

import generateError from "../../scripts/generateError.js"
import saveImage from "../../scripts/saveImage.js"

const newPropertyController = async (req, res, next) => {
    try {
        const { id } = req.user
        let newPropertyData = req.body
        //---- TO DO: Comprobación de propiedad duplicada ----//
        /*const sameProperty = await selectPropertyByAddressModel(req.body.address)

        if (sameProperty.length > 0) {
            throw generateError(409, "Esa propiedad ya está registrada")
        }*/

        //---- Esquemas de JOI.----//
        await validateSchema(newPropertySchema, newPropertyData)

        //---- Guardado de las imágenes en el servidor ----///
        let images = []
        let imageNames

        // Comprueba si tiene imágenes.
        if (req.files) {
            // Añadimos las imágenes a un array.
            for (let file of Object.values(req.files)) {
                images.push(file)
            }

            for (let image of images) {
                await validateSchema(imgSchema, image)
            }

            // Recorremos las imágenes con un map y las vamos guardando a la vez que guardamos su nombre en una nueva variable.
            imageNames = images.map(async (image) => {
                const newImage = await saveImage(image)
                return newImage
            })

            //---- Inserción en la base de datos ----////

            // Inserción de la propiedad a la tabla de propiedades.
            let newPropertyID = await insertPropertyModel(newPropertyData, id)

            newPropertyData.id = await newPropertyID

            // Inserción de las imágenes a la tabla de imágenes.
            const imageIds = imageNames.map(async (name) => {
                const imageId = await insertImageModel(name)

                return imageId
            })

            // Vinculación de imágenes con las propiedades.
            for (let id of imageIds) {
                const newId = await insertImagePropertyModel(
                    await id,
                    newPropertyID
                )
            }

            const [newProperty] = await selectProperyDetailsModel(
                await newPropertyID
            )

            newProperty.property_images =
                newProperty.property_images?.split(",")

            res.status(200).send({
                status: "ok",
                data: newProperty,
                message: "Propiedad registrada",
            })
        } else {
            // Devuelve un bad request si no las tiene.
            throw generateError(400, "Necesitas al menos añadir una imagen")
        }
    } catch (error) {
        next(error)
    }
}
export default newPropertyController
