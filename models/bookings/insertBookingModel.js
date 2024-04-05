import getDb from "../../config/getDb.js"

const insertBookingModel = async (newBookingData) => {
    const { starting_date, ending_date, tenant_id, property_id } =
        newBookingData

    let connection
    try {
        connection = await getDb()
        const [newBooking] = await connection.query(
            ` INSERT INTO bookings (starting_date, ending_date, is_confirmed, tenant_id, property_id)
            VALUES(?,?,?,?,?)`,
            [starting_date, ending_date, 0, tenant_id, property_id]
        )
        return newBooking.insertId
    } finally {
        if (connection) connection.release()
    }
}

export default insertBookingModel
