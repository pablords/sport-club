import { Body, Controller, Post } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { IPaymentTransaction } from './interfaces/payment-transaction.interface';
import { CreatePaymentTransactionRequestDto } from './interfaces/create-payment-transaction-request.dto';

@Controller('payment-transactions')
export class PaymentTransactionController {
  constructor(private paymentTransactionService: PaymentTransactionService) {}

  @Post('execute')
  async execute(@Body() body: CreatePaymentTransactionRequestDto) {
    return this.paymentTransactionService.execute(body);
  }
}
