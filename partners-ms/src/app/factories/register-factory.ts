import { GetEmailContact, SaveContact } from "@/app/core/use-cases/contact"
import { SaveContract } from "@/app/core/use-cases/contract/SaveContract"
import { SaveModality, GetModalityList } from "@/app/core/use-cases/modality"
import { PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { ProducerNotification } from "@/app/core/use-cases/notification/ProducerNotification"
import { kafka } from "@/infra/services/kafka/config"
import {
  SavePartner,
  GetFullRegisterDataPartner
} from "@/app/core/use-cases/partner"
import { entityManager } from "@/infra/db/config"
import { ContactModel } from "@/infra/models/ContactModel"
import { ContractModel } from "@/infra/models/ContractModel"
import { ModalityModel } from "@/infra/models/ModalityModel"
import { PartnerModel } from "@/infra/models/PartnerModel"

const contactRepositoryDb = entityManager.getRepository(ContactModel)
const contractRepositoryDb = entityManager.getRepository(ContractModel)
const modalityRepositoryDb = entityManager.getRepository(ModalityModel)
const partnerRepositoryDb = entityManager.getRepository(PartnerModel)

export const registerFactory = () => {
  const partnerRepository = new PartnerRepositoryDb(partnerRepositoryDb)
  const savePartnerUseCase = new SavePartner(partnerRepository)
  const getFullRegisterDataPartner = new GetFullRegisterDataPartner(partnerRepository)

  const contactRepository = new ContactRepositoryDb(contactRepositoryDb)
  const saveContactUseCase = new SaveContact(contactRepository)
  const getContactUseCase = new GetEmailContact(contactRepository)

  const modalityRepository = new ModalityRepositoryDb(modalityRepositoryDb)
  const saveModalityUseCase = new SaveModality(modalityRepository)
  const getModalityUseCase = new GetModalityList(modalityRepository)

  const contractRepository = new ContractRepositoryDb(contractRepositoryDb)
  const saveContractUseCase = new SaveContract(contractRepository)

  const producerNotification = new ProducerNotification(kafka)

  return {
    savePartnerUseCase,
    getFullRegisterDataPartner,
    saveContactUseCase,
    getContactUseCase,
    saveModalityUseCase,
    getModalityUseCase,
    saveContractUseCase,
    producerNotification
  }
}
