import { Module } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import { LoggerService } from './logger.service';
import { KafkaModule } from '../kafka/kafka.module';
@Module({
  imports: [
    KafkaModule,
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Payments', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          dirname: path.resolve('logs/info/'),
          filename: 'info.log',
          level: 'info',
          handleExceptions: false,
        }),
        new winston.transports.File({
          dirname: path.resolve('logs/error/'),
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
