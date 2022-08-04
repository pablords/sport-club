import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { contactFactory } from "@/app/factories/contact-factory"
import { Contact } from "@/app/core/entity"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { HttpStatusCode } from "@/app/exceptions/interfaces"

const {
  deleteContactUseCase,
  getAllContacts,
  getContactUseCase,
  producerNotification,
  saveContactUseCase,
  updateContactUseCase
} = contactFactory()

class ContractController {
  async saveOneContact (req: Request, res: Response, next: NextFunction) {
    const data: Contact = req.body
    try {
      const result = await saveContactUseCase.execute(data)
      await producerNotification.execute(JSON.stringify(result), "partners-ms-notification")
      return res.status(HttpStatusCode.CREATED).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getContact (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getContactUseCase.execute(Number(req.params.id))
      return res.status(HttpStatusCode.OK).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllContacts (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllContacts.execute()
      return res.status(HttpStatusCode.OK).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updateContact (req: Request, res: Response, next: NextFunction) {
    const contact: Contact = req.body
    try {
      const result = await updateContactUseCase.execute(
        Number(req.params.id),
        contact.partnerId,
        contact
      )
      await producerNotification.execute(JSON.stringify(result), "partners-ms-notification")
      return res.status(HttpStatusCode.CREATED).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deleteContact (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const result = await deleteContactUseCase.execute(Number(id))
      return res.status(HttpStatusCode.NO_CONTENT).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ContractController()
