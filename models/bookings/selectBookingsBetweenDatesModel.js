import getDb from "../../config/getDb.js"

const selectBookingsBetweenDatesModel = async (
    starting_date,
    ending_date,
    property_id,
    id
) => {
    let connection
    try {
        connection = await getDb()
        const [bookings] = await connection.query(
            `SELECT id FROM bookings WHERE starting_date BETWEEN ? AND ? AND property_id= ? AND id != ?`,
            [starting_date, ending_date, property_id, id]
        )
        return bookings
    } finally {
        if (connection) connection.release()
    }
}

export default selectBookingsBetweenDatesModel
