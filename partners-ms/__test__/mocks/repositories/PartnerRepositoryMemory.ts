import { Partner } from "@/app/core/entity"
import { IRepositoryDbMethodsBase } from "@/app/repository/RepositoryBase"

const partnerList: Partner[] = []

const dataValidated: Partner = {
  id: 123,
  name: "joao",
  surname: "da silva",
  birthDate: new Date("1990-02-24")
}

export interface IPartnerRepositoryDbMethods
    extends Partial<IRepositoryDbMethodsBase<Partner>> {
    findEmail(partner: Partner): Promise<Partner>;
    findRelationsOne(
        id: number,
        relations: Array<"contacts" | "modalities" | "contracts">
    ): Promise<Partner>;
}

export class PartnerRepositoryMemory implements IPartnerRepositoryDbMethods {
  async save (partner: Partner) {
    return Promise.resolve().then(() => {
      partner.id = Math.floor(Math.random() * 1000)
      partnerList.push(partner)
      return partnerList
    }).catch((err) => {
      return err
    })
  }

  async findOne (id: number) {
    return Promise.resolve().then(() => {
      return partnerList.find(pi => pi.id === id)
    }).catch((err) => {
      return err
    })
  }

  async delete (id: number) {
    return Promise.resolve().then(() => {
      const thisPartner = partnerList.find(pi => pi.id === id)
      const result = partnerList.splice(thisPartner.id, 1)
      return result
    }).catch((err) => {
      return err
    })
  }

  async find (filter?: object) {
    return Promise.resolve().then(() => {
      return partnerList
    }).catch((err) => {
      return err
    })
  }

  async findEmail (partner: Partner) {
    return Promise.resolve().then(() => {
      return partnerList.find((pi) => pi.id === partner.id)
    }).catch((err) => {
      return err
    })
  }

  async findRelationsOne (id: number, relations: ("contacts" | "modalities" | "contracts")[]) {
    return Promise.resolve().then(() => {
      return partnerList.find((pi) => pi.id === id)
    }).catch((err) => {
      return err
    })
  }

  async create (partner: Partner) {
    return Promise.resolve().then(() => {
      partner.id = Math.floor(Math.random() * 1000)
      partnerList.push(partner)
      return partnerList
    }).catch((err) => {
      return err
    })
  }
}
