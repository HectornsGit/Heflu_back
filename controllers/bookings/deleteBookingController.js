import selectBookingByIdModel from "../../models/bookings/selectBookingByIdModel.js"
import selectPropertyByIdModel from "../../models/properties/selectPropertyByIdModel.js"
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js"
import deleteBookingModel from "../../models/bookings/deleteBookingModel.js"

import generateError from "../../scripts/generateError.js"
import sendBookingCancellationEmail from "../../scripts/sendBookingCancellationEmail.js"

const deleteBookingController = async (req, res, next) => {
    try {
        const { id } = req.params
        //---- Comprobación de propietario de la reserva ----//
        const [booking] = await selectBookingByIdModel(id)
        const [property] = await selectPropertyByIdModel(booking.property_id)

        if (property.owner_id !== req.user.id) {
            throw generateError(
                400,
                "No puedes eliminar las reservas de otro usuario"
            )
        }

        deleteBookingModel(id)

        //---- usuario ----//
        const [tenant] = await selectUserByIdModel(booking.tenant_id)

        //---- Envío de el email de notificación al dueño de la reserva. ----//
        sendBookingCancellationEmail(tenant.email, property)

        res.status(200).send({
            status: "ok",
            message: "Reserva eliminada con éxito",
        })
    } catch (error) {
        next(error)
    }
}
export default deleteBookingController
