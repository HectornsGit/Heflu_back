import getDb from "../../config/getDb.js"

const selectAllPropertiesModel = async () => {
    let connection
    try {
        connection = await getDb()
        const properties = await connection.query(`
          SELECT
            p.id,
            p.type,
            p.location,
            p.country,
            p.price,
            p.bedrooms,
            p.bathrooms,
            p.owner_id,
          GROUP_CONCAT(i.name) AS property_images,
          ROUND((SELECT AVG(r.rating)
            FROM reviews r, bookings b, properties p
            WHERE p.owner_id = u.id
            AND p.id = b.property_id
            AND r.is_owner != 1
            AND b.id = r.booking_id), 1) AS media_rating
          FROM properties p
          LEFT JOIN properties_images x ON p.id=x.property_id
          LEFT JOIN images i ON x.image_id=i.id
          JOIN users u ON p.owner_id=u.id
          GROUP BY p.id;
        `)
        return properties[0]
    } finally {
        if (connection) connection.release()
    }
}

export default selectAllPropertiesModel
