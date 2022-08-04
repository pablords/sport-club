import { Injectable, Inject } from '@nestjs/common';
import { IPaymentTransactionService } from './interfaces/payment-transaction.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTransactions } from './payment-transaction.entity';
import { IPaymentTransaction } from './interfaces/payment-transaction.interface';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PaymentTransactionService implements IPaymentTransactionService {
  constructor(
    @InjectRepository(PaymentTransactions)
    private paymentPaymentTransactionsRepository: Repository<PaymentTransactions>,
    @Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka,
    private eventEmitter: EventEmitter2
  ) {}


  async execute(data: IPaymentTransaction): Promise<any> {
    const transaction = await this.paymentPaymentTransactionsRepository.save(data);
    this.eventEmitter.emit('payments.transactions.created', transaction);
    return transaction
  }

  @OnEvent('payments.transactions.created')
  producer(event: IPaymentTransaction){
    this.kafkaClient.emit('payments.transactions.created', {
      key: event.id,
      value: JSON.stringify(event),
    });
  }
}
