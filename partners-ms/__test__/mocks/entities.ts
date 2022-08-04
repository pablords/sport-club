import { Contact, Contract, Modality, Partner } from "@/app/core/entity"

export default {
  getContact () {
    return {
      id: 123,
      address: "endereco 1",
      email: "email@email.com",
      phone: 9999334455,
      partnerId: 2
    } as Contact
  },

  getContract () {
    return {
      id: 1,
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 2
    } as Contract
  },

  getModality () {
    return {
      id: 123,
      name: "futebol",
      description: "esporte"
    } as Modality
  },

  getPartner () {
    return {
      id: 123,
      name: "joao",
      surname: "da silva",
      birthDate: new Date("1990-02-24"),
      createdAt: new Date()
    } as Partner
  }
}
