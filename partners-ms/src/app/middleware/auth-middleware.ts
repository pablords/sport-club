
import { NextFunction, Request, Response } from "express"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

class AuthMiddleware {
  public async execute (req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers.authorization || req.headers.token
    try {
      if (!token) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.TOKEN_NOT_FOUND,
          undefined
        )
      }
      if (req.headers.token) {
        req.headers.authorization = `bearer ${req.headers.token}`
      }
      next("route")
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export const authMiddleware = new AuthMiddleware()
