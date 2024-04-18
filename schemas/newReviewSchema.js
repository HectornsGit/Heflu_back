import joiErrorMessages from "./joiErrorMessages.js"
import joi from "joi"
const newReviewSchema = joi.object({
    bookingId: joi.number().required().messages(joiErrorMessages),
    comment: joi.string().max(200).required().messages(joiErrorMessages),
    rating: joi.number().valid(1, 2, 3, 4, 5).required().messages({
        "any.only": "La valoración debe ser un número entero entre el 1 y el 5",
    }),
})

export default newReviewSchema
