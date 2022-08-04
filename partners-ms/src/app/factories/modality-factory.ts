import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import {
  DeleteModality,
  GetAllmodality,
  GetModality,
  SaveModality,
  UpdateModality
} from "@/app/core/use-cases/modality"
import { entityManager } from "@/infra/db/config"
import { ModalityModel } from "@/infra/models/ModalityModel"

const repository = entityManager.getRepository(ModalityModel)

export const modalityFactory = () => {
  const modalityRepository = new ModalityRepositoryDb(repository)
  const getAllModalityUseCase = new GetAllmodality(modalityRepository)
  const getModalityUseCase = new GetModality(modalityRepository)
  const saveModalityUseCase = new SaveModality(modalityRepository)
  const deleteModalityUseCase = new DeleteModality(modalityRepository)
  const updateModalityUseCase = new UpdateModality(modalityRepository)

  return {
    getAllModalityUseCase,
    getModalityUseCase,
    saveModalityUseCase,
    deleteModalityUseCase,
    updateModalityUseCase
  }
}
