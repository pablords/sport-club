import { FgGreen } from "../console.color"
import { server } from "./server"
import { apiVersion } from "@Utils/getVersion"

const { APP_HOST, APP_PORT } = process.env
server.listen(APP_PORT, () => {
  console.log(
    FgGreen,
        `Server start in ${APP_HOST}:${APP_PORT}/${apiVersion}`
  )
})
