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
            `SELECT * FROM bookings b 
            WHERE (b.starting_date BETWEEN ? AND ?
            OR b.ending_date BETWEEN ? AND ?
            OR (b.starting_date < ? AND b.ending_date > ?))
            AND b.property_id = ? 
            AND b.id != ?;`,
            [
                starting_date,
                ending_date,
                starting_date,
                ending_date,
                starting_date,
                ending_date,
                property_id,
                id,
            ]
        )
        return bookings
    } finally {
        if (connection) connection.release()
    }
}

export default selectBookingsBetweenDatesModel
