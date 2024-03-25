import joi from "joi"
import joiErrorMessages from "./joiErrorMessages.js"
import imgSchema from "./imgSchema.js"

const newUserSchema = joi.object({
    name: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi
        .string()
        .min(8)
        .max(100)
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    bio: joi.string().required().messages(joiErrorMessages),
    avatar: imgSchema.required().messages(joiErrorMessages),
})

export default newUserSchema
