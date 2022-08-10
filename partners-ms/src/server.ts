
import "dotenv/config"
import express from "express"
import cors from "cors"
import { router } from "./routes"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../docs/swagger.json"
import { getVersionApi } from "@/app/utils/getVersion"
import { keycloak } from "@/infra/services/keycloak/config"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { authMiddleware } from "@/app/middleware/auth-middleware"
import { getNewRefreshToken } from "@/app/middleware/get-refresh-token"
import { contractConsumer } from "@/app/consumers/contract.consumer"
import { createWorkerContractConsumer } from "./app/consumers/worker"

const version = getVersionApi()

export const server = express()
server.use(cors())
server.use(express.json())

server.get(`/${version}/health`, (_, res) => res.send({ message: "partners-ms is running", uptime: new Date() }))
server.use(`/${version}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.get("/", (_, res) => {
  res.redirect(`/${version}/health`)
})

server.use(errorHandlerMiddleware.logErrorMiddleware)
server.use(errorHandlerMiddleware.returnError)
server.use(authMiddleware.execute)
// server.use(getNewRefreshToken.execute)

server.use(keycloak.middleware({
  logout: "/logout",
  admin: "/"
}))

createWorkerContractConsumer()

server.use(`/${version}`, router)
