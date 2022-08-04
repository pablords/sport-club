import { Response, Request, NextFunction } from "express"

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    UNPROCESSABLE_ENTITY = 422
}

export interface IErrorHandlerMiddlewareMethods{
    logError(err: any): Promise<void>
    logErrorMiddleware(error: any, req: Request, res: Response, next: NextFunction): Promise<void>
    returnError(error: any, req: Request, res: Response, next: NextFunction): Promise<Response<any>>
    isOperationalError(error: any): Promise<boolean>
}
