import getDb from "../../config/getDb.js"

const insertUserModel = async (newUserData, registrationCode) => {
    const { name, email, bio, avatarName, password } = newUserData
    let connection
    try {
        connection = await getDb()

        await connection.query(
            `INSERT INTO users (email, name, bio, avatar, password, registration_code) VALUES(?, ?, ?, ?, ?, ?)`,
            [email, name, bio, avatarName, password, registrationCode]
        )
    } finally {
        if (connection) connection.release()
    }
}

export default insertUserModel
