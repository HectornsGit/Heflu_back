import getDb from "../../config/getDb.js"

const insertImageModel = async (name) => {
    let connection
    try {
        connection = await getDb()
        const [newImage] = await connection.query(
            `INSERT INTO images(name) VALUES(?)`,
            [await name]
        )
        return newImage.insertId
    } finally {
        if (connection) connection.release()
    }
}

export default insertImageModel
