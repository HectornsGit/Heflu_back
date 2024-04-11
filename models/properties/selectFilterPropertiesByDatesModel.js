import getDb from "../../config/getDb.js"

const selectFilterPropertiesByDatesModel = async (params) => {
    let connection

    // ToDo: Sacar a script

    const date = new Date()
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)

    const formattedDate = `${year}-${month}-${day}`

    // Fin ToDo

    const startDate =
        params.startDate === undefined ? formattedDate : params.startDate
    const endDate =
        params.endDate === undefined ? formattedDate : params.endDate

    try {
        connection = await getDb()
        const filterPropertiesByDate = await connection.query(
            `WITH tmp_confirmed AS 
            (   
            SELECT b.id, selected_date from 
            (select ADDDATE('2024-01-01',t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date from
             (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
             (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
             (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
             (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3) v,
             bookings b
            where selected_date between starting_date and ending_date and is_confirmed=1
            ORDER BY selected_date ASC
            )
            SELECT DISTINCT b.property_id
              FROM bookings b, tmp_confirmed t
             WHERE b.is_confirmed = 1
               AND b.id = t.id
               AND t.selected_date BETWEEN ? AND ?;`,
            [startDate, endDate]
        )
        return filterPropertiesByDate[0]
    } finally {
        if (connection) connection.release()
    }
}

export default selectFilterPropertiesByDatesModel
