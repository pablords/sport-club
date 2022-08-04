export interface IBaseService<T> {
  create(data: T | T[]): Promise<any>;
  findAll(): Promise<T[]>;
  findOne(filter?: object | any): Promise<T | T[]>;
  delete(id: number, filter?: number): Promise<any>;
}
