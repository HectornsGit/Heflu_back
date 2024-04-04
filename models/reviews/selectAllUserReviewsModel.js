import getDb from "../../config/getDb.js"

const selectPropertiesDetailsModel = async (id) => {
    let connection
    try {
        connection = await getDb()
        const [reviews] = await connection.query(
            `SELECT u.id as user_id, u.name, u.avatar, 'as_owner' AS rev_type, r.id, r.comment, r.rating, r.created_at
               FROM properties p, users u, bookings b, reviews r
              WHERE u.id = b.tenant_id
                AND b.id = r.booking_id
                AND r.is_owner = 0
                AND b.property_id = p.id
                AND p.owner_id = ?
              UNION           
             SELECT o.id, o.name, o.avatar, 'as_tenant', r.id, r.comment, r.rating, r.created_at
               FROM users u, bookings b, reviews r, users o, properties p
              WHERE b.tenant_id = u.id
                AND b.property_id=p.id
                AND p.owner_id=o.id
                AND r.is_owner=1
                AND b.id = r.booking_id
                AND u.id = ?;`,
            [id, id]
        )
        return reviews
    } finally {
        if (connection) connection.release()
    }
}

export default selectPropertiesDetailsModel
