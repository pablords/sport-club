import { IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"
import { Contract } from "@/app/core/entity/Contract"

export class UpdateContractStatus {
  constructor (private constractRepository: IContractRepositoryDbMethods) {
    this.constractRepository = constractRepository
  }

  async execute (id: number, status: number) {
    return this.constractRepository.updateStatus(id, status)
  }
}
