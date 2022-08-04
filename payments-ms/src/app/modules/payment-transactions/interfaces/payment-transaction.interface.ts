export enum status{
    PENDENTE = 0,
    PAGO = 1,
    CANCELADO = 2
}

export interface IPaymentTransaction{
    id?: string
    contractId: number
    status: status
}
