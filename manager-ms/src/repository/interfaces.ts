export interface IRepositoryDbMethodsBase<T> {
    create?(data: T | T[]): Promise<T>;
    find?(filter?: object): Promise<T | T[]>;
    findOne?(filter?: object | number): Promise<T>;
    delete?(id: number, filter?: number): Promise<T>;
    update?(id: number, data: T): Promise<T>;
}

export interface IGetTokenResposeDataDTO {
    token: string;
    expires: number;
}
