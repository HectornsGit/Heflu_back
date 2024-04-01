import saveImage from "../../scripts/saveImage.js"

const newPropertyController = async (req, res, next) => {
    try {
        let newPropertyData = req.body
        //---- TO DO: Comprobación de propiedad duplicada ----//
        /*const sameProperty = await selectPropertyByAddressModel(req.body.address)

        if (sameProperty.length > 0) {
            throw generateError(409, "Esa propiedad ya está registrada")
        }*/

        //---- Esquemas de JOI.----//
        //await validateSchema(newPropertySchema, newPropertyData)

        //---- Guardado de las imágenes en el servidor ----///
        let images = []
        let imageNames
        if (req.files) {
            // Añadimos las imágenes a un array.
            for (let file of Object.values(req.files)) {
                images.push(file)
            }
            // Recorremos las imágenes con un map y las vamos guardando a la vez que guardamos su nombre en una nueva variable.
            imageNames = images.map(async (image) => {
                const newImage = await saveImage(image)
                console.log(newImage)
                return newImage
            })
        }

        // TO DO: INSERTAR LAS IMÁGENES Y LAS PROPIEDADES
        console.log(imageNames)
        //---- Inserción en la base de datos ----////
        // await insertPropertyModel(newPropertyData)
        // await insertImagesModel(newImagesData)

        res.status(200).send({ status: "ok", message: "Propiedad registrada" })
    } catch (error) {
        next(error)
    }
}
export default newPropertyController
