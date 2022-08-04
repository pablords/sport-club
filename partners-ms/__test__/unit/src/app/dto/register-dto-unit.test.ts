import { SavePartnersDTOResponse } from "@/app/dto/register-dto"
import { Contract, Partner, Modality, Contact } from "@/app/core/entity"

describe("Testes de unidade register-dto", () => {
  it("Deve retornar um register-dto", () => {
    const partner: Partner = {
      id: 123,
      name: "joao",
      surname: "da silva",
      birthDate: new Date("1990-02-24")
    }
    const contract: Contract = {
      id: 1,
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 2
    }
    const modalities: Modality[] = [{
      id: 123,
      name: "futebol",
      description: "esporte"
    }]
    const contacts = [{
      address: null,
      email: "email@email",
      phone: 9999334455,
      partnerId: 2
    }]
    const savePartnersDTOResponseData = {
      partner: partner,
      contacts: contacts,
      modalities: modalities,
      contracts: contract
    }
    const called = SavePartnersDTOResponse.execute(partner, contract)
    // expect(called).resolves.toBe(savePartnersDTOResponseData)
  })
})
