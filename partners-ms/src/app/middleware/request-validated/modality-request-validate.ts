import { Request, Response, NextFunction } from "express"
import { fieldValidated } from "@/app/validators/modalityValidator"
import { APIError } from "../../exceptions/base-error"
import { HttpStatusCode } from "../../exceptions/interfaces"
import businessError from "../../exceptions/business-error"
import { errorHandlerMiddleware } from "../error-handler"

export class ModalityRequestValidate {
  async create (req: Request, res: Response, next: NextFunction) {
    const matched = await fieldValidated(req.body)
    try {
      if (matched) {
        throw new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          matched
        )
      }
      next()
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export const modalityRequestValidate = new ModalityRequestValidate()
