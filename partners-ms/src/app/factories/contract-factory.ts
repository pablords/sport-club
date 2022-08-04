import { UpdateWithPartner, SaveOneContract, GetContract, GetAllContracts, DeleteContract, UpdateContractStatus } from "@/app/core/use-cases/contract"
import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { ContractModel } from "@/infra/models/ContractModel"

const repository = entityManager.getRepository(ContractModel)

export const contractFactory = () => {
  const contractRepositoryDb = new ContractRepositoryDb(repository)
  const updateWithPartner = new UpdateWithPartner(contractRepositoryDb)
  const saveOneContractUseCase = new SaveOneContract(contractRepositoryDb)
  const getContractUseCase = new GetContract(contractRepositoryDb)
  const getAllContractUseCase = new GetAllContracts(contractRepositoryDb)
  const deeleteContractUseCase = new DeleteContract(contractRepositoryDb)
  const updateContractStatus = new UpdateContractStatus(contractRepositoryDb)

  return {
    updateWithPartner,
    saveOneContractUseCase,
    getContractUseCase,
    getAllContractUseCase,
    deeleteContractUseCase,
    updateContractStatus
  }
}
