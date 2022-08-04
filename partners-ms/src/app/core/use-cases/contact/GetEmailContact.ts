import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"
import { Contact } from "@/app/core/entity"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

export class GetEmailContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact[]) {
      if (!contact) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.EMAIL_EXISTS
        )
      }
      return await this.contactRepository.findEmail(contact)
    }
}
