import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { modalityFactory } from "@/app/factories/modality-factory"
import { errorHandlerMiddleware } from "@/app//middleware/error-handler"
import { Modality } from "@/app/core/entity/Modality"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
const {
  deleteModalityUseCase,
  getAllModalityUseCase,
  getModalityUseCase,
  saveModalityUseCase,
  updateModalityUseCase
} = modalityFactory()
class ModalityController {
  async saveModality (req: Request, res: Response, next: NextFunction) {
    const data: Modality[] = req.body
    try {
      const result = await saveModalityUseCase.execute(data)
      return res.status(HttpStatusCode.CREATED).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllModality (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllModalityUseCase.execute()
      return res.status(HttpStatusCode.OK).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getModality (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getModalityUseCase.execute(Number(req.params.id))
      return res.status(HttpStatusCode.OK).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updateModality (req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const id = req.params.id
    try {
      const result = await updateModalityUseCase.execute(Number(id), data)
      return res.status(HttpStatusCode.NO_CONTENT).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deleteModality (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const result = await deleteModalityUseCase.execute(Number(id))
      return res.status(HttpStatusCode.NO_CONTENT).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ModalityController()
