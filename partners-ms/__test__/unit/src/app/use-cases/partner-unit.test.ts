// @ts-nocheck
import { PartnerRepositoryMemory } from "../../../../mocks/repositories"
import { Partner } from "@/app/core/entity/Partner"

import {
  DeletePartner,
  GetAllPartner,
  GetFullRegisterDataPartner,
  GetPartner,
  SavePartner,
  UpdatePartner
} from "@/app/core/use-cases/partner"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

const dataValidated: Partner = {
  id: 123,
  name: "joao",
  surname: "da silva",
  birthDate: new Date("1990-02-24")
}

const repository = new PartnerRepositoryMemory()
const savePartner = new SavePartner(repository)
const deletePartner = new DeletePartner(repository)
const getAllPartner = new GetAllPartner(repository)
const getFullRegisterDataPartner = new GetFullRegisterDataPartner(repository)
const getPartner = new GetPartner(repository)
const updatePartner = new UpdatePartner(repository)

describe("Testes unitários de informacões pessoais", () => {
  let list: []
  beforeAll(async () => {
    jest.useFakeTimers()
    list = [
      {
        name: "joao",
        surname: "da silva",
        birthDate: new Date("1990-02-24")
      },
      {
        name: "jose",
        surname: "silveira",
        birthDate: new Date("1990-03-14")
      }
    ]

    for (const pi of list) {
      await repository.save(pi)
    }

    await repository.save(dataValidated)
  })

  afterAll(() => {
    list = []
  })

  it("Não deve salvar um registro caso o nome seja omitido", async () => {
    const data = {
      name: null,
      surname: "da silva",
      birthDate: new Date("1990-02-24")
    }
    const result = await savePartner.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o sobrenome seja omitido", async () => {
    const data = {
      name: "joao",
      surname: null,
      birthDate: new Date("1990-02-24")
    }
    const result = await savePartner.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso a data de nascimento seja omitido", async () => {
    const data = {
      name: "joao",
      surname: "da silva",
      birthDate: null
    }
    const result = await savePartner.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await savePartner.execute(dataValidated)
    expect(result).toEqual(result)
  })

  it("Não Deve listar informação pessoal de sócio caso o id seja omitido", async () => {
    try {
      const result: any = await getPartner.execute(null)
      expect(result).toThrow(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    } catch (error) {}
  })

  it("Não Deve deletar informação pessoal de sócio caso o id seja omitido", async () => {
    try {
      expect(await deletePartner.execute(null)).toThrow(APIError)
    } catch (error) {}
  })

  it("Deve listar todos registros de informações pessoais de sócios", async () => {
    const result = await getAllPartner.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar informação pesoal de sócio caso seja passado um id", async () => {
    const result = await getPartner.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar informação pesoal de sócio caso seja passado um id", async () => {
    const result = await deletePartner.execute(dataValidated.id)
    expect(result).toHaveLength(0)
  })
})
