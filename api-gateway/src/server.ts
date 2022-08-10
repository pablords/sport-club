import express, { Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../docs/api.json";
import { api } from "./routes";
import LoggerMiddleware from "./middlewares/logger";
import EventEmitter from "events";
import ProducerLogsService from "./services/producer-logs.service";
import { ROUTES } from "./routes";
import { setupProxies } from "./setupProxy";
import { HealthController } from "./controllers/health.controller";
import { setupAuth } from "./setupAuth";

export const eventEmitter = new EventEmitter();
export const server = express();
server.use(cors());

server.use(`/${api}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));

eventEmitter.on("middleware.logs.api.created", ProducerLogsService.produce);
server.use(LoggerMiddleware.collect);

server.get(`/${api}/health`, async (_, res: Response) => {
  const contorller = new HealthController();
  const response = await contorller.getStatusHealth();
  return res.send(response);
});

setupAuth(server, ROUTES);
setupProxies(server, ROUTES);

