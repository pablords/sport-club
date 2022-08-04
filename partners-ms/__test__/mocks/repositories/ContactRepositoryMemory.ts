import { Contact } from "@/app/core/entity"
import { ContactModel } from "@/infra/models/ContactModel"
import { IRepositoryDbMethodsBase } from "@/app/repository/RepositoryBase"

const contactInfomrationList: Contact[] = []

export interface IContactRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Contact>> {
  findEmail(contacts: Contact[]): Promise<ContactModel[]>
  saveOneContact(contact: Contact): Promise<ContactModel>
  updateContact(id: number, partnerId: number, contact: Contact): Promise<any>
  createMany(contacts: Contact[]): Promise<ContactModel[]>
}
export class ContactMemory implements Partial<IContactRepositoryDbMethods> {
  async save (contact: Contact) {
    return Promise.resolve().then(() => {
      contact.id = Math.floor(Math.random() * 1000)
      contactInfomrationList.push(contact)
      return contact
    }).catch((err) => {
      return err
    })
  }

  async find () {
    return Promise.resolve().then(() => {
      return contactInfomrationList
    }).catch((err) => {
      return err
    })
  }

  async findEmail (contacts: Contact[]): Promise<ContactModel[]> {
    return Promise.resolve().then(() => {
      const listEmail = []
      for (const ct of contacts) {
        const emailExists = contactInfomrationList.find(pi => pi.id === ct.id)
        listEmail.push(emailExists)
      }
      return listEmail[0]
    }).catch((err) => {
      return err
    })
  }

  async findOne (id: number) {
    return Promise.resolve().then(() => {
      return contactInfomrationList.find(pi => pi.id === id)
    }).catch((err) => {
      return err
    })
  }

  async saveOneContact (contact: Contact) {
    return Promise.resolve().then(() => {
      contact.id = Math.floor(Math.random() * 1000)
      contactInfomrationList.push(contact)
      return contact
    }).catch((err) => {
      return err
    })
  }

  async updateContact (id: number, partnerId: number, contact: Contact) {
    return Promise.resolve().then(() => {
      const thisContact = contactInfomrationList.map(e => {
        if (e.id == id && e.partnerId == partnerId) {
          return e == contact
        }
        return e
      })
      return thisContact
    }).catch((err) => {
      return err
    })
  }

  async delete (id: number) {
    return Promise.resolve().then(() => {
      const thiscontact = contactInfomrationList.find(pi => pi.id === id)
      const result = contactInfomrationList.splice(thiscontact.id, 1)
      return result
    }).catch((err) => {
      return err
    })
  }

  async createMany (contacts: Contact[]): Promise<ContactModel[]> {
    return Promise.resolve().then(() => {
      return [...contactInfomrationList, contacts]
    }).catch((err) => {
      return err
    })
  }

  async create (data: Contact): Promise<Contact> {
    return Promise.resolve().then(() => {
      data.id = Math.floor(Math.random() * 1000)
      contactInfomrationList.push(data)
      return data
    }).catch((err) => {
      return err
    })
  }
}
