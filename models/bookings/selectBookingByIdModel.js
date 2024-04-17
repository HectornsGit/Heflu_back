import getDb from "../../config/getDb.js"

const selectBookingByIdModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [booking] = await connection.query(
            `SELECT bookings.*,P.owner_id as owner_id
            FROM bookings
            JOIN properties P on P.id = bookings.property_id 
            WHERE bookings.id = ?`,
            [id]
        )
        return booking
    } finally {
        if (connection) connection.release()
    }
}

export default selectBookingByIdModel
