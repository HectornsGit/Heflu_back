// Validación de datos con JOI
// Pasar como parámetros el esquema y los datos a validar
const validateSchema = async (schema, data) => {
    try {
        await schema.validateAsync(data)
    } catch (err) {
        err.httpStatus = 400
        throw err
    }
}

export default validateSchema
