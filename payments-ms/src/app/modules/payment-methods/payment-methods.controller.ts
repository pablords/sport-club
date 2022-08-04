import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpException,
  Request,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodRequestDto } from './interfaces/create-payment-method-request.dto';
import { IPaymentMethods } from './interfaces/payment-methods.interface';
import { DeleteResult } from 'typeorm';
import { CreatePaymentMethodResponseDto } from './interfaces/create-payment-method-response.dto';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @Post()
  async create(
    @Body() paymentMethods: CreatePaymentMethodRequestDto,
    @Request() req: any,
  ): Promise<IPaymentMethods | HttpException> {
    const paymentMethod = await this.paymentMethodsService.create({
      ...paymentMethods,
      traceId: req.headers.traceId,
    });
    if (!paymentMethod)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'payment-method: error processing request',
        },
        HttpStatus.BAD_REQUEST,
      );

    const createPaymentMethodResponseDto = {
      name: paymentMethod.name,
      description: paymentMethod.description
    } as CreatePaymentMethodResponseDto

    return createPaymentMethodResponseDto;
  }

  @Get()
  async findAll(): Promise<IPaymentMethods[]> {
    const paymentMethods = await this.paymentMethodsService.findAll();
    if (!paymentMethods)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'payment-method: not found',
        },
        HttpStatus.NOT_FOUND,
      );
    return paymentMethods;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IPaymentMethods> {
    const paymentMethod = await this.paymentMethodsService.findOne(id);
    if (!paymentMethod)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'payment-method: not found',
        },
        HttpStatus.NOT_FOUND,
      );
    return paymentMethod;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    const resData = await this.paymentMethodsService.delete(id);
    if (resData.affected == 0)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'payment-method: error processing request',
        },
        HttpStatus.BAD_REQUEST,
      );
    return resData;
  }
}
