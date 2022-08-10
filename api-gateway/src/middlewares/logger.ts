import { logger } from "../config/logger";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { eventEmitter } from "../server";


export interface LoggerMiddlewareDtoCreate {
  traceId: string;
  middleware: string;
  ip: string;
  method: string;
  path: string;
  host: string;
  agent: string | string[];
  platform: string | string[];
  origin: string;
  token: string;
}

class LoggerMiddleware {
  async collect(req: Request, res: Response, next: NextFunction) {
    const traceId = randomUUID();
    const data: LoggerMiddlewareDtoCreate = {
      traceId: traceId,
      middleware: LoggerMiddleware.name,
      ip: req.ip,
      method: req.method,
      path: req.path,
      host: req.headers.host,
      agent: req.headers["sec-ch-ua"],
      platform: req.headers["sec-ch-ua-platform"],
      origin: req.headers.origin,
      token: req.headers.authorization
    };
    req.headers = { ...req.headers, traceId: traceId };
    if(data.path !== "/api/v1/health"){
      eventEmitter.emit("middleware.logs.api.created", data);
    }
    next();
  }
}

export default new LoggerMiddleware();
