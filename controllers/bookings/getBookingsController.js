import selectBookingsByOwnerIdModel from "../../models/bookings/selectBookingsByOwnerIdModel.js"

const getBookingsController = async (req, res, next) => {
    try {
        const { id } = req.user
        const bookings = await selectBookingsByOwnerIdModel(id)

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
            formattedBookings.push(booking)
        }
        res.status(200).send({
            status: "ok",
            data: formattedBookings,
        })
    } catch (err) {
        next(err)
    }
}

export default getBookingsController
