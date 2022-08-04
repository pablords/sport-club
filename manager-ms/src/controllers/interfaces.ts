import { NextFunction, Request, Response } from "express"

export interface IControllerHttpMethods{
    create?(req: Request, res: Response, next?: NextFunction): Promise<Response<any>>
    find?(req: Request, res: Response, next?: NextFunction): Promise<Response<any>>
    findOne?(req: Request, res: Response, next?: NextFunction): Promise<Response<any>>
    update?(req: Request, res: Response, next?: NextFunction): Promise<Response<any>>
    delete?(req: Request, res: Response, next?: NextFunction): Promise<Response<any>>
}
