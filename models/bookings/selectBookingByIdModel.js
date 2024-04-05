import getDb from "../../config/getDb.js"

const selectBookingByIdModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [booking] = await connection.query(
            `SELECT * FROM bookings WHERE id = ?`,
            [id]
        )
        return booking
    } finally {
        if (connection) connection.release()
    }
}

export default selectBookingByIdModel
