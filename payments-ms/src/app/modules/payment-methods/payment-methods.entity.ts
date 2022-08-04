import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IPaymentMethods } from './interfaces/payment-methods.interface';

@Entity()
export class PaymentMethods implements IPaymentMethods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  traceId?: string;
}
