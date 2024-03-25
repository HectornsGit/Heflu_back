import express from "express"
import cors from "cors"
import morgan from "morgan"

import { PORT } from "#config/env"

import userRoutes from "#api/userRoutes"
import propertiesRoutes from "./api/propertiesRoutes.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("common"))

app.use("/users", userRoutes)
app.use("/properties", propertiesRoutes)

app.use((req, res) => {
    res.status(404)
    res.send({ status: 404, message: "Página no encontrada" })
})

app.use((err, req, res, next) => {
    res.status(err.httpStatus).send({
        status: err.httpStatus,
        message: err.message,
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})
