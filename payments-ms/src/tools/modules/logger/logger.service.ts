import { Injectable, Inject, ConsoleLogger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerMiddlewareDtoCreate } from './logger.middleware.create.dto';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  ClientKafka
} from '@nestjs/microservices';
@Injectable()
export class LoggerService {
  constructor(
    @Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @OnEvent('middleware.logs.created')
  handleLoggerCreatedEvent(event: LoggerMiddlewareDtoCreate) {
    this.kafkaClient.emit('payments.middleware.logs', {
      key: event.traceId,
      value: JSON.stringify(event),
    });
  }
}
