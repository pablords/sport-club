import { LogModel } from "../../infra/models/log.model";
import mongoose from "mongoose";
import { logger } from "../../infra/config/logger";

const Log = mongoose.model("Log", LogModel);

export interface IDataLog {
  traceId: string;
  middleware: string;
  ip: string;
  method: string;
  path: string;
  host: string;
  agent: string;
  platform: string;
  origin: string;
}

export async function processDataStream(data: string) {
  const dataParse: IDataLog = JSON.parse(data);
  const dt: IDataLog = {
    ...dataParse,
    ip: dataParse.ip?.replace("::ffff:", " ") || "",
    agent: dataParse.agent?.replace("/", " ") || "",
    platform: dataParse.platform?.replace("''", " ") || "",
  };
  await Log.create(dt);
}
