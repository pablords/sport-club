import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentMethodsModule } from './app/modules/payment-methods/payment-methods.module';
import { HealthController } from './app/controllers/health/health.controller';
import { DbAppModule } from './tools/modules/db-app/db-app.module';
import { LoggerModule } from './tools/modules/logger/logger.module';
import { LoggerMiddleware } from './app/middlewares/logger/logger.middleware';
import { KafkaModule } from './tools/modules/kafka/kafka.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {PaymentTransactionModule} from "./app/modules/payment-transactions/payment-transactions.module"



@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentMethodsModule,
    DbAppModule,
    LoggerModule,
    KafkaModule,
    EventEmitterModule.forRoot(),
    PaymentTransactionModule
  ],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('payment-methods', 'payment-transactions');
  }
}
