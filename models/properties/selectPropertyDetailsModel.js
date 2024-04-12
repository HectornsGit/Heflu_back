import getDb from "../../config/getDb.js"

const selectPropertiesDetailsModel = async (id) => {
    let connection
    try {
        connection = await getDb()
        const [property] = await connection.query(
            `SELECT 
            p.id,
            p.name as title,
            p.description,
            p.type, 
            p.location, 
            p.country, 
            p.price,
            p.area, 
            p.bedrooms, 
            p.bathrooms, 
          GROUP_CONCAT(i.name) AS property_images,
            u.id AS owner_id, 
            u.name, 
            u.avatar,
          ROUND((SELECT AVG(r.rating) 
            FROM reviews r, bookings b, properties p 
            WHERE p.owner_id = u.id
            AND p.id = b.property_id 
            AND r.is_owner != 1
            AND b.id = r.booking_id), 1) AS media_rating
          FROM properties p
          LEFT JOIN properties_images x ON p.id=x.property_id
          LEFT JOIN images i ON x.image_id=i.id
          JOIN users U ON p.owner_id = u.id
          WHERE p.id IN (?)
          GROUP BY p.id;`,
            [id]
        )
        return property
    } finally {
        if (connection) connection.release()
    }
}

export default selectPropertiesDetailsModel
