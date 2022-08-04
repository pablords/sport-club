
import "dotenv/config"
import express from "express"
import cors from "cors"
import { router } from "./routes"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../src/docs/swagger.json"
import { apiVersion } from "@Utils/getVersion"
import { errorHandler } from "src/exceptions/error-handler"
import { authMiddleware } from "src/middleware/auth-middleware"

export const server = express()
server.use(cors())
server.use(express.json())

server.get(`/${apiVersion}/health`, (_, res) => res.send({ message: "manager-ms is running", date: new Date() }))
server.use(`/${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.get("/", (_, res) => {
  res.redirect(`/${apiVersion}/health`)
})

server.use(errorHandler.logErrorMiddleware)
server.use(errorHandler.returnError)
server.use(authMiddleware.execute)

server.use(`/${apiVersion}`, router)
