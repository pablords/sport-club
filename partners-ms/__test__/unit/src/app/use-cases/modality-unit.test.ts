// @ts-nocheck
import { ModalityRepositoryMemory } from "../../../../mocks/repositories"
import { Modality } from "@/app/core/entity/Modality"
import {
  DeleteModality,
  GetAllmodality,
  GetModality,
  GetModalityList,
  SaveModality,
  UpdateModality
} from "@/app/core/use-cases/modality"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { UpdateResult } from "typeorm"

const repository = new ModalityRepositoryMemory()

const deleteModality = new DeleteModality(repository)
const getAllmodality = new GetAllmodality(repository)
const getModality = new GetModality(repository)
const getModalityList = new GetModalityList(repository)
const saveModality = new SaveModality(repository)
const updateModality = new UpdateModality(repository)

const dataValidated: Modality = {
  id: 123,
  name: "futebol",
  description: "esporte"
}

describe("Testes unitários de modalidades", () => {
  beforeAll(async () => {
    jest.useFakeTimers()
    const list: Modality[] = [
      {
        name: "basket",
        description: "esporte"
      },
      {
        name: "jiujitsu",
        description: "esporte"
      }
    ]

    for (const pi of list) {
      await repository.save(pi)
    }

    await repository.save(dataValidated)
  })

  it("Não deve salvar um registro caso o nome seja omitido", async () => {
    const data = {
      name: null,
      description: "esporte"
    }
    try {
      const result = await saveModality.execute(null)
      expect(result).toThrow(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    } catch (error) {}
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await saveModality.execute(dataValidated)
    expect(result).toEqual(result)
  })

  it("Não Deve listar modalidade caso o id seja omitido", async () => {
    try {
      const result = await getModality.execute(null)
      expect(result).toThrow(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND
        ))
    } catch (error) {}
  })

  it("Não Deve deletar modalidade caso o id seja omitido", async () => {
    try {
      const result = await deleteModality.execute(null)
      expect(result).toThrow(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND
        ))
    } catch (error) {}
  })

  it("Deve listar todos registros de modalidades", async () => {
    const result = await getAllmodality.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar modalidade caso seja passado um id", async () => {
    const result = await getModality.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar modalidade caso seja passado um id", async () => {
    const result = await deleteModality.execute(dataValidated.id)
    expect(result).toHaveLength(0)
  })

  it("Nao deve listar modalidades caso nao seja passado uma lista de modalidade no payload", async () => {
    try {
      const result = await getModalityList.execute(null)
      expect(result).toThrow(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    } catch (error) {}
  })

  it("Deve listar modalidades caso sejs passado uma lista de modalidades", async () => {
    const spy = jest.spyOn(repository, "find").mockReturnThis()
    const result = await getAllmodality.execute([dataValidated])
    expect(spy).toBeCalledTimes(1)
  })

  it("Nao deve atualizar uma modalidade caso nao seja passado todos os dados obrigatorios", async () => {
    try {
      const result = await updateModality.execute(null, null)
      expect(result).toThrow(new APIError("NOT_FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        businessError.MODALITY_NOT_FOUND
      ))
    } catch (error) {}
  })

  it("Deve atualizar uma modalidade caso seja passado todos os dados obrigatorios", async () => {
    const mockResponse: UpdateResult = { generatedMaps: {}, raw: "any", affected: 1 }
    try {
      const result = await updateModality.execute(1, dataValidated)
      expect(result).toEqual(mockResponse)
    } catch (error) {}
  })
})
