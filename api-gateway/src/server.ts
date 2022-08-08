import express from "express";
import cors from "cors";
import { router } from "./routes";


export const server = express();

server.use(cors());
server.use("/", router);
