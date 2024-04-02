import getDb from "../../config/getDb.js"

const insertPropertyModel = async (newPropertyData, owner_id) => {
    const {
        name,
        description,
        type,
        location,
        country,
        price,
        area,
        bedrooms,
        bathrooms,
    } = newPropertyData
    let connection
    try {
        connection = await getDb()
        const [newProperty] = await connection.query(
            `INSERT INTO properties(name, description, type, location, country, price, area, bedrooms, bathrooms, owner_id) VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                name,
                description,
                type,
                location,
                country,
                price,
                area,
                bedrooms,
                bathrooms,
                owner_id,
            ]
        )
        return newProperty.insertId
    } finally {
        if (connection) connection.release()
    }
}

export default insertPropertyModel
