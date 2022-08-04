
export interface Contract {
    id?: number
    start: Date
    dueDate: Date
    isActive: boolean
    status: number
    createdAt?: Date
    updatedAt?: Date
    modalityId?: number
    partnerId: number
}
