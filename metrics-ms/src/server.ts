import "dotenv/config";
import express from "express";
import { getVersionApi } from "./app/utils/getVersion";
import { getMetricsConsumerService } from "./app/services/getMetricsConsumer.service";
import { randomUUID } from "crypto";
import { mongodbConfig } from "./infra/config/db";

const version = getVersionApi();

export const server = express();

server.get(`/${version}/health`, (_, res) =>
  res.send({ message: "metrics-ms is running", uptime: new Date() })
);

mongodbConfig()

getMetricsConsumerService(
  `metrics-ms-${randomUUID()}`,
  "api.gateway.logs"
);
