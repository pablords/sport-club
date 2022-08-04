import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"
export class SaveContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (modalities: any[], partnerId: number) {
      if (modalities.length == 0) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      }
      const dataContract = modalities.map(modality => {
        return {
          ...modality.contract,
          modalityId: modality.id,
          partnerId: partnerId
        }
      })
      return await this.contractRepository.create(dataContract)
    }
}
