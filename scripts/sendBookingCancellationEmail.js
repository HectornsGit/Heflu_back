import { Resend } from "resend"
import { RESEND_API_KEY } from "../config/env.js"

const sendBookingConfirmationEmail = (email, property) => {
    const resend = new Resend(RESEND_API_KEY)
    resend.emails.send({
        from: "heflu@resend.dev",
        to: [email],
        subject: "Reserva anulada",
        html: `<h1>¡Lo sentimos, parece ser que tu reserva en:</h1>
        <p><strong>${property.name} - ${property.location}</strong></p>
        <h2><em><strong>Ha sido anulada</strong></em></h2>
        <h2>HEFLÚ</h2>`,
    })
}

export default sendBookingConfirmationEmail
