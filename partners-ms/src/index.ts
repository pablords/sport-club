
import { server } from "./server"
import { getVersionApi } from "@/app/utils/getVersion"
import { logger } from "@/infra/logger/config"

const version = getVersionApi()

const { APP_HOST, APP_PORT } = process.env
server.listen(APP_PORT, () => {
  logger.info(`Server start in ${APP_HOST}:${APP_PORT}/${version}`)
})
