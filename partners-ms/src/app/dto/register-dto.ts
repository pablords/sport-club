
import { Contract, Partner, Modality, Contact } from "@/app/core/entity"

export interface ISavePartnersDTOResponse{
  partner: {
    id: number
    name: string
    surname:string
    birthDate: Date
    createdAt: Date
  },
  contacts: Contact[]
  modalities: Modality[]
  contracts: Contract
}

export class SavePartnersDTOResponse {
  static execute (partner: Partner, contract: Contract) {
    return {
      partner: {
        id: partner.id,
        name: partner.name,
        surname: partner.surname,
        birthDate: partner.birthDate,
        createdAt: partner.createdAt,
        updatedAt: partner.updatedAt
      },
      contacts: partner.contacts,
      modalities: partner.modalities,
      contracts: contract
    } as ISavePartnersDTOResponse
  }
}
