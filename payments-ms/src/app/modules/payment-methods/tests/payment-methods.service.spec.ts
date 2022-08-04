import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsService } from '../payment-methods.service';
import { PaymentMethods } from '../payment-methods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([PaymentMethods]),
      ],
      providers: [PaymentMethods, PaymentMethodsService],
    }).compile();

    service = module.get<PaymentMethodsService>(PaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
