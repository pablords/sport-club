import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"

export class DeleteContact {
  constructor (private contactRepository: ContactRepositoryDb) {
    this.contactRepository = contactRepository
  }

  async execute (id: number) {
    if (!id) {
      throw new APIError("BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC,
        undefined
      )
    }
    return this.contactRepository.delete(id)
  }
}
