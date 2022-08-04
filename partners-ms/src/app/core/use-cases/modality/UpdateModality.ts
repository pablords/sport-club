import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { Modality } from "@/app/core/entity"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"

export class UpdateModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (id: number, modality: Modality) {
      if (!id) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND
        )
      }
      return await this.modalityRepository.update(id, modality)
    }
}
