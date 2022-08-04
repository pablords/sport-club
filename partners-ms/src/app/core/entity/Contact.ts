export interface Contact {
    id?: number;
    phone: number;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
    partnerId?: number;
}
