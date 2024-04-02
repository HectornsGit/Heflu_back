import getDb from "../../config/getDb.js"

const insertImagePropertyModel = async (image_id, property_id) => {
    let connection
    try {
        connection = await getDb()
        const [newProperty] = await connection.query(
            `INSERT INTO properties_images(image_id,property_id) VALUES(?,?)`,
            [await image_id, property_id]
        )
        return newProperty.insertId
    } finally {
        if (connection) connection.release()
    }
}

export default insertImagePropertyModel
