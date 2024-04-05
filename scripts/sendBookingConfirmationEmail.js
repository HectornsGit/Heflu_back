import { Resend } from "resend"
import { RESEND_API_KEY } from "../config/env.js"

const sendBookingConfirmationEmail = (email, property) => {
    const resend = new Resend(RESEND_API_KEY)
    resend.emails.send({
        from: "heflu@resend.dev",
        to: [email],
        subject: "¡Reserva confirmada!",
        html: `<h1>¡Buenas, tu reserva ha sido aceptada!</h1>
        <h2><em><strong>Disfruta de tu estancia en</strong></em></h2>
        <p><strong>${property.name} - ${property.location}</strong></p>
        <h2>HEFLÚ</h2>`,
    })
}

export default sendBookingConfirmationEmail
