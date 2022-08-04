
import { errorHandler } from "@Exceptions/error-handler"
import { NextFunction, Request, Response } from "express"
import { getTokenApi } from "@Core/use-cases/auth/get-token-api"
import { saveTokendbCache } from "@Core/use-cases/auth/save-token-db"

class AuthMiddleware {
  public async execute (req: Request, res: Response, next: NextFunction) {
    const access_token_header = req.headers.authorization?.split(" ")[1]
    try {
      const { access_token, expires } = await getTokenApi.execute()
      if (access_token && expires <= 20) {
        await saveTokendbCache.execute(access_token)
      }
      if (access_token) {
        req.headers.authorization = access_token
      }
      if (access_token_header) {
        req.headers.authorization = access_token_header
      }
      next()
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }
}

export const authMiddleware = new AuthMiddleware()
