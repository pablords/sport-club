import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import {
  SaveOneContact,
  UpdateContact,
  DeleteContact,
  GetContact,
  GetAllContacts
} from "@/app/core/use-cases/contact"
import { ProducerNotification } from "@/app/core/use-cases/notification/ProducerNotification"
import { kafka } from "@/infra/services/kafka/config"
import { entityManager } from "@/infra/db/config"
import { ContactModel } from "@/infra/models/ContactModel"

const repository = entityManager.getRepository(ContactModel)
export const contactFactory = () => {
  const contactRepository = new ContactRepositoryDb(repository)
  const saveContactUseCase = new SaveOneContact(contactRepository)
  const updateContactUseCase = new UpdateContact(contactRepository)
  const deleteContactUseCase = new DeleteContact(contactRepository)
  const getContactUseCase = new GetContact(contactRepository)
  const getAllContacts = new GetAllContacts(contactRepository)
  const producerNotification = new ProducerNotification(kafka)

  return {
    saveContactUseCase,
    updateContactUseCase,
    deleteContactUseCase,
    getContactUseCase,
    getAllContacts,
    producerNotification

  }
}
