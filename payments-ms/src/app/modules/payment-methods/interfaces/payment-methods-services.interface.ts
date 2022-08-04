import { CreatePaymentMethodRequestDto } from './create-payment-method-request.dto';
import { IBaseService } from '../../../interfaces/base-service.interface';
import { IPaymentMethods } from './payment-methods.interface';

export interface IPaymentMethodsService extends IBaseService<IPaymentMethods> {
  create(paymentMethods: CreatePaymentMethodRequestDto): Promise<any>;
  findAll(): Promise<IPaymentMethods[]>;
  findOne(id: number): Promise<IPaymentMethods>;
  delete(id: number): Promise<any>;
}
