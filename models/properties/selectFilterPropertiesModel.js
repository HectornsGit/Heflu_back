import getDb from "../../config/getDb.js"

const selectFilterPropertiesModel = async (params, ids) => {
    let connection

    if (ids.length === 0 || ids === undefined) {
        ids.push(0)
    }

    const country = params.country === undefined ? "%" : `%${params.country}%`
    const maxPrice =
        params.maxPrice === undefined ? "9999999999" : params.maxPrice
    const minRooms = params.minRooms === undefined ? "0" : params.minRooms

    try {
        connection = await getDb()
        const filterProperties = await connection.query(
            `SELECT p.id FROM properties p
              WHERE p.country LIKE ?
              AND p.price <= ?
              AND p.bedrooms >= ?
              AND p.id NOT IN (?)`,
            [country, maxPrice, minRooms, ids]
        )

        return filterProperties[0]
    } finally {
        if (connection) connection.release()
    }
}

export default selectFilterPropertiesModel
