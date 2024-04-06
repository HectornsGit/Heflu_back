import selectPropertyByIdModel from "../../models/properties/selectPropertyByIdModel.js"
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js"
import insertBookingModel from "../../models/bookings/insertBookingModel.js"
import generateError from "../../scripts/generateError.js"
import sendBookingNotificationEmail from "../../scripts/sendBookingNotificationEmail.js"
import selectBusyBookingDatesModel from "../../models/bookings/selectBusyBookingDatesModel.js"

const newBookingController = async (req, res, next) => {
    try {
        let bookingData = {
            starting_date: req.body.starting_date,
            ending_date: req.body.ending_date,
            property_id: req.body.id,
        }

        //---- Comprobación de propietario de la reserva ----//
        const [property] = await selectPropertyByIdModel(req.body.id)

        if (property.owner_id === req.user.id) {
            throw generateError(400, "No puedes reservar tus propios inmuebles")
        }

        //---- Comprobación de disponibilidad de la reserva ----//
        const busyDates = await selectBusyBookingDatesModel(req.body.id)

        const formattedBusyDates = busyDates.map(
            (dateObject) => dateObject.selected_date
        )

        if (
            formattedBusyDates.includes(bookingData.starting_date) ||
            formattedBusyDates.includes(bookingData.ending_date)
        ) {
            throw generateError(400, "No puedes reservar en días ocupados")
        }

        //---- dueño ----//
        const [owner] = await selectUserByIdModel(property.owner_id)

        //---- usuario ----//
        //const tennant = await selectUserByIdModel(req.user.id)

        bookingData.tenant_id = req.user.id

        //---- Inserción en la base de datos ----//
        await insertBookingModel(bookingData)

        //---- Envío de el email de notificación al dueño de la reserva. ----//
        sendBookingNotificationEmail(owner.email, property)

        res.status(200).send({
            status: "ok",
            message:
                "Reserva creada con éxito, cuando el casero decida si acepta la reserva se notificará por email.",
        })
    } catch (error) {
        next(error)
    }
}
export default newBookingController
