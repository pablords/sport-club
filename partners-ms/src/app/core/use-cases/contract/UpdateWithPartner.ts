import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"
import { Contract } from "@/app/core/entity"
import { addMonths, compareAsc, parseISO, compareDesc, subMonths } from "date-fns"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

export class UpdateWithPartner {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: IContractRepositoryDbMethods) {
      this.contractRepository = contractRepository
    }

    async execute (id: number, partnerId: number, contract: Contract) {
      if (!contract.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      // if (!contract.status) return !contract.status
      const start = parseISO(String(contract.start))
      const end = parseISO(String(contract.dueDate))
      const resultCalcDueDate = compareAsc(parseISO(String(contract.start)), parseISO(String(contract.dueDate)))
      const resultCalcStartDate = compareDesc(parseISO(String(contract.start)), parseISO(String(contract.dueDate)))
      const startDateAddMonth = addMonths(parseISO(String(contract.start)), 1)
      const endDateSubMonth = subMonths(parseISO(String(contract.dueDate)), 1)

      const data: Contract = {
        ...contract,
        status: contract.status,
        start: resultCalcStartDate == 1 ? endDateSubMonth : start,
        dueDate: resultCalcDueDate == 1 ? startDateAddMonth : end
      }

      const result = await this.contractRepository.updateWithPartner(id, partnerId, data)
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return result
    }
}
