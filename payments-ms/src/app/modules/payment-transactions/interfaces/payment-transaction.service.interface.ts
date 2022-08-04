export interface IPaymentTransactionService{
    execute(data: any): Promise<any>
}