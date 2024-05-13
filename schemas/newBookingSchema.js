import joiErrorMessages from "./joiErrorMessages.js"
import joi from "joi"
const newBookingSchema = joi.object({
    property_id: joi.number().required().messages(joiErrorMessages),
    starting_date: joi.date().required().messages(joiErrorMessages),
    ending_date: joi.date().required().messages(joiErrorMessages),
})

export default newBookingSchema
