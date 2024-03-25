import express from "express"
import cors from "cors"
import morgan from "morgan"

import { PORT } from "#config/env"

import userRoutes from "#api/userRoutes"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("common"))

app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})
