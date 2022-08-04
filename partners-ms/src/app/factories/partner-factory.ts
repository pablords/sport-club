import {
  DeletePartner,
  GetPartner,
  SavePartner,
  GetAllPartner,
  UpdatePartner
} from "@/app/core/use-cases/partner"
import { PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { PartnerModel } from "@/infra/models/PartnerModel"

const repository = entityManager.getRepository(PartnerModel)

export const partnerFactory = () => {
  const partnerRepository = new PartnerRepositoryDb(repository)
  const savePartnerUseCase = new SavePartner(partnerRepository)
  const updatePartnerPartnerUseCase = new UpdatePartner(partnerRepository)
  const getPartnerPartnerUseCase = new GetPartner(partnerRepository)
  const getAllPartnerPartnerUseCase = new GetAllPartner(partnerRepository)
  const deletePartnerPartnerUseCase = new DeletePartner(partnerRepository)

  return {
    savePartnerUseCase,
    updatePartnerPartnerUseCase,
    getPartnerPartnerUseCase,
    getAllPartnerPartnerUseCase,
    deletePartnerPartnerUseCase
  }
}
