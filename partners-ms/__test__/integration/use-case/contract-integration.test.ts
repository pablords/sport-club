import { Contract, Partner, Modality } from "../../../src/app/core/entity"
import { AxiosResponse } from "axios"
import { api } from "../utils/api"

describe("Testes de integracao de Contrato", () => {
  beforeAll(async () => {
    const modalities: Modality[] =
            [
              { name: "futebol", description: "esporte" },
              { name: "basquete", description: "esporte" },
              { name: "jiujitsu", description: "esporte" },
              { name: "karatê", description: "esporte" },
              { name: "natação", description: "esporte" }

            ]

    for (const modality of modalities) {
      await api.post("/modality", modality)
    }
  })

  it("deve salvar e associar um contrato para um sócio", async () => {
    const contract = {
      start: "2021-04-01",
      dueDate: "2021-05-01",
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 1
    }

    const result: AxiosResponse<Partner> = await api.post("/contract/one", contract)
    expect(result.status).toBe(201)
  })
})

it("deve salvar e associar 2 contratos para um sócio", async () => {
  const list = [
    {
      start: "2021-04-01",
      dueDate: "2021-05-01",
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 2

    },
    {
      start: "2021-06-01",
      dueDate: "2021-07-01",
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 3
    }
  ]

  for (const contract of list) {
    const result: AxiosResponse<Partner> = await api.post("/contract/one", contract)
    expect(result.status).toBe(201)
  }
})
