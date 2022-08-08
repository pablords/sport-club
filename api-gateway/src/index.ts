import "dotenv/config"
import { logger } from "./config/logger";
import { server } from "./server";

const { APP_PORT, APP_HOST } = process.env;

server.listen(APP_PORT, () => {
  logger.info(`Server stating at http://${APP_HOST}:${APP_PORT}`);
});
