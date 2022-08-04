import { Partner } from "../../../src/app/core/entity"
import { AxiosResponse } from "axios"
import { api } from "../utils/api"

describe("Testes de integracao de sócios", () => {
  it("deve salvar um sócio", async () => {
    const partner = {
      name: "joao",
      surname: "da silva",
      birthDate: "1990-02-24"
    }
    const result: AxiosResponse<Partner> = await api.post("/partner", partner)
    expect(result.status).toBe(201)
  })
})
