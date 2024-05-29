import selectBookingsByTenantIdModel from "../../models/bookings/selectBookingsByTenantId.js"
const getUserBookingsController = async (req, res, next) => {
    try {
        const { id } = req.user
        const bookings = await selectBookingsByTenantIdModel(id)

        if (bookings.length < 1) {
            return res.status(204).send({
                status: "ok",
                data: [],
                message: "¡No has participado en ninguna estancia todavía!",
            })
        }

        let formattedBookings = []

        for (let booking of bookings) {
            booking.images = booking.images.split(",")
            booking.starting_date += "GMT+01:00"
            booking.ending_date += "GMT+01:00"
            formattedBookings.push(booking)
        }
        console.log(formattedBookings)
        res.status(200).send({
            status: "ok",
            data: formattedBookings,
        })
    } catch (err) {
        next(err)
    }
}

export default getUserBookingsController
