import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerMiddlewareDtoCreate } from '../../../tools/modules/logger/logger.middleware.create.dto';
import {randomUUID} from "crypto"
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private eventEmitter: EventEmitter2) {}

  use(req: Request, res: Response, next: NextFunction) {
    const traceId = randomUUID()
    const data: LoggerMiddlewareDtoCreate = {
      traceId: traceId,
      middleware: LoggerMiddleware.name,
      ip: req.ip,
      method: req.method,
      path: req.path,
      host: req.headers.host,
      agent: req.headers['sec-ch-ua'],
      platform: req.headers['sec-ch-ua-platform'],
      origin: req.headers.origin,
      token: req.headers.authorization,
    };
    req.headers = {...req.headers, traceId: traceId}
    this.eventEmitter.emit('middleware.logs.created', data);
    next();
  }
}
