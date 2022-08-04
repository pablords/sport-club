import { Contact } from "@/app/core/entity"
import { ContactModel } from "@/infra/models/ContactModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"
import { Repository } from "typeorm"

export interface IContactRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Contact>> {
    findEmail(contacts: Contact[]): Promise<Contact[]>
    saveOneContact(contact: Contact): Promise<Contact>
    updateContact(id: number, partnerId: number, contact: Contact): Promise<any>
    createMany(contacts: Contact[]): Promise<Contact[]>
}

export class ContactRepositoryDb implements IContactRepositoryDbMethods {
  constructor (private repository: Repository<ContactModel>) {
    this.repository = repository
  }

  async createMany (contacts: Contact[]) {
    return await this.repository.save(contacts)
  }

  async find () {
    return await this.repository.find()
  }

  async findOne (id: number) {
    return await this.repository.findOne({ where: { id: id } })
  }

  async findEmail (contacts: Contact[]) {
    const listEmail = []
    for (const ct of contacts) {
      const emailExists = await this.repository.findOne({ where: { email: ct.email } })
      listEmail.push(emailExists)
    }
    return listEmail[0]
  }

  async saveOneContact (contact: Contact) {
    return await this.repository.save(contact)
  }

  async updateContact (id: number, partnerId: number, contact: Contact) {
    return await this.repository.update(id, { ...contact, partnerId: partnerId })
  }

  async delete (id: number) {
    return await this.repository.delete(id)
  }
}
