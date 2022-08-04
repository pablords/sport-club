import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { Contract } from "@/app/core/entity"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { contractFactory } from "@/app/factories/contract-factory"
const {
  deeleteContractUseCase,
  getAllContractUseCase,
  getContractUseCase,
  saveOneContractUseCase,
  updateWithPartner
} = contractFactory()

class ContractController {
  async saveOneContract (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      const result = await saveOneContractUseCase.execute(data)
      return res.status(HttpStatusCode.CREATED).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updateContractStatus (req: Request, res: Response, next: NextFunction) {
    const contract: Contract = req.body
    try {
      const result = await updateWithPartner.execute(Number(req.params.id), contract.partnerId, contract)
      return res.status(HttpStatusCode.NO_CONTENT).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getContract (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const result = await getContractUseCase.execute(Number(id))
      return res.status(HttpStatusCode.OK).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllContracts (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllContractUseCase.execute()
      return res.status(HttpStatusCode.OK).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deleteContract (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      const result = await deeleteContractUseCase.execute(Number(req.params.id), data.partnerId)
      return res.status(HttpStatusCode.NO_CONTENT).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ContractController()
