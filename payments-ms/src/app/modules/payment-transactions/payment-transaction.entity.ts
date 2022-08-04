

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IPaymentTransaction, status } from './interfaces/payment-transaction.interface';

@Entity()
export class PaymentTransactions implements IPaymentTransaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  contractId: number;

 @Column()
  status: status;

}
