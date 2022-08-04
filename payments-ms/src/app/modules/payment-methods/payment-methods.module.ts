import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethods } from './payment-methods.entity';


@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  imports: [TypeOrmModule.forFeature([PaymentMethods])],
})
export class PaymentMethodsModule {}
