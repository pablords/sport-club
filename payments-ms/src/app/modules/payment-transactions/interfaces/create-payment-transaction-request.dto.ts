import { status } from "./payment-transaction.interface"

export class CreatePaymentTransactionRequestDto {
  contractId: number
  status: status
}
