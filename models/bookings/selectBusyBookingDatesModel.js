import getDb from "../../config/getDb.js"

const selectBusyBookingDatesModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [busyDates] = await connection.query(
            `SELECT selected_date FROM 
            (SELECT ADDDATE('2024-01-01',t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM
             (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,
             (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,
             (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,
             (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3) v,
             bookings b
            WHERE selected_date BETWEEN starting_date AND ending_date AND is_confirmed=1 AND property_id=?
            ORDER BY selected_date ASC;`,
            [id]
        )
        return busyDates
    } finally {
        if (connection) connection.release()
    }
}

export default selectBusyBookingDatesModel
