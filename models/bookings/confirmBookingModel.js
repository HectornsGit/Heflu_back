import getDb from "../../config/getDb.js"

const confirmBookingModel = async (id) => {
    let connection
    try {
        connection = await getDb()
        const [newBooking] = await connection.query(
            ` UPDATE bookings SET is_confirmed = ? WHERE id = ?`,
            [true, id]
        )
        return newBooking.insertId
    } finally {
        if (connection) connection.release()
    }
}

export default confirmBookingModel
