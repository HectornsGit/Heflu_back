import confirmBookingModel from "../../models/bookings/confirmBookingModel.js"
import selectBookingByIdModel from "../../models/bookings/selectBookingByIdModel.js"
import selectPropertyByIdModel from "../../models/properties/selectPropertyByIdModel.js"
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js"
import selectBookingsBetweenDatesModel from "../../models/bookings/selectBookingsBetweenDatesModel.js"
import generateError from "../../scripts/generateError.js"
import sendBookingConfirmationEmail from "../../scripts/sendBookingConfirmationEmail.js"
import deleteBookingModel from "../../models/bookings/deleteBookingModel.js"
import sendBookingCancellationEmail from "../../scripts/sendBookingCancellationEmail.js"

const confirmBookingController = async (req, res, next) => {
    try {
        const { id } = req.params
        //---- Comprobación de propietario de la reserva ----//
        const [booking] = await selectBookingByIdModel(id)
        const [property] = await selectPropertyByIdModel(booking.property_id)

        if (property.owner_id !== req.user.id) {
            throw generateError(
                400,
                "No puedes activar las reservas de otro usuario"
            )
        }

        //---- usuario ----//
        const [tenant] = await selectUserByIdModel(booking.tenant_id)

        //---- Inserción en la base de datos ----//
        confirmBookingModel(id)

        //---- Eliminación del resto de reservas de la base de datos ----//
        const bookingsToCancel = await selectBookingsBetweenDatesModel(
            booking.starting_date,
            booking.ending_date,
            booking.property_id,
            id
        )

        if (bookingsToCancel.length > 0) {
            for (let booking of bookingsToCancel) {
                deleteBookingModel(booking.id)

                //---- usuario ----//
                const [tenant] = await selectUserByIdModel(booking.tenant_id)

                //---- Envío de el email de notificación al dueño de la reserva. ----//
                sendBookingCancellationEmail(tenant.email, property)
            }
        }
        //---- Envío de el email de notificación al dueño de la reserva. ----//
        sendBookingConfirmationEmail(tenant.email, property)

        res.status(200).send({
            status: "ok",
            message: "¡Reserva confirmada!",
        })
    } catch (error) {
        next(error)
    }
}
export default confirmBookingController
