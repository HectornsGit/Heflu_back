// Validación de datos con JOI

import generateError from "./generateError.js"

// Pasar como parámetros el esquema y los datos a validar
const validateSchema = async (schema, data) => {
    try {
        await schema.validateAsync(data)
    } catch (err) {
        throw generateError(400, err.message)
    }
}

export default validateSchema
