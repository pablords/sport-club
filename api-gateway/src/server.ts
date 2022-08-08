import express from "express";
import cors from "cors";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";

export const server = express();

server.use(cors());
server.use(express.static("docs"));

server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

server.use("/", router);
