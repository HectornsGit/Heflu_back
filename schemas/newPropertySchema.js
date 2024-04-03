import joi from "joi"
import joiErrorMessages from "./joiErrorMessages.js"

const newPropertySchema = joi.object({
    name: joi.string().required().messages(joiErrorMessages),
    description: joi.string().max(200).required().messages(joiErrorMessages),
    type: joi
        .string()
        .valid("Chalet", "Apartamento", "Casa rural", "Otros")
        .messages(joiErrorMessages),
    location: joi.string().max(50).required().messages(joiErrorMessages),
    country: joi.string().max(50).required().messages(joiErrorMessages),
    price: joi.number().required().messages(joiErrorMessages),
    area: joi.number().required().messages(joiErrorMessages),
    bedrooms: joi.number().required().messages(joiErrorMessages),
    bathrooms: joi.number().required().messages(joiErrorMessages),
})

export default newPropertySchema
