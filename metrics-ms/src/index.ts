import { server } from "./server";
import { logger } from "./infra/config/logger";

const { APP_PORT, APP_HOST } = process.env;

server.listen(APP_PORT, () => {
  logger.info(`server is starting at ${APP_HOST}:${APP_PORT}`);
});
