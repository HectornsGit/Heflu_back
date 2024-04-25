import "dotenv/config"

const {
    UPLOADS_DIR,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    RESEND_API_KEY,
    SECRET,
    FRONTEND_PORT,
} = process.env

const { PORT } = process.env || 3000

export {
    UPLOADS_DIR,
    PORT,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    RESEND_API_KEY,
    SECRET,
    FRONTEND_PORT,
}
