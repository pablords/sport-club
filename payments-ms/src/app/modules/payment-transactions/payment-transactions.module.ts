import { Module } from '@nestjs/common';
import { PaymentTransactionController } from './payment-transaction.controller';
import { PaymentTransactionService } from './payment-transaction.service';
import { KafkaModule } from '../../../tools/modules/kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransactions } from './payment-transaction.entity';

@Module({
  controllers: [PaymentTransactionController],
  providers: [PaymentTransactionService],
  imports: [KafkaModule, TypeOrmModule.forFeature([PaymentTransactions])],
})
export class PaymentTransactionModule {}
