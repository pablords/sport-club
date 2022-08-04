// @ts-nocheck

import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { ModalityModel } from "@/infra/models/ModalityModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import Entity from "../../../../mocks/entities"

// jest.mock("@/app/repository/ContactRepositoryDb")

const RepositoryMock = entityManager.getRepository(ModalityModel) as jest.Mock<Repository<ModalityModel>>
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ModalityModel>>

const repository = new ModalityRepositoryDb(repositoryMock)

describe("Testes unitários de Repositorio de modalidades", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Deve salvar uma modalidade", async () => {
    const modality = Entity.getModality()
    const spy = jest.spyOn(repositoryMock, "save")
    spy.mockReturnValue([modality])
    const savedModality = await repository.createMany([modality])
    expect(savedModality).toEqual([modality])
    expect(repositoryMock.save).toBeCalledTimes(1)
    expect(repositoryMock.save([modality])).toEqual([modality])
    spy.mockRestore()
  })

  it("Deve retornar uma lista de modalidades", async () => {
    const modalities = Entity.getModality()
    const spy = jest.spyOn(repositoryMock, "find")
    spy.mockReturnValue([modalities])
    const getModalities = await repository.find()
    expect(getModalities).toEqual([modalities])
    expect(repositoryMock.find).toBeCalledTimes(1)
    expect(repositoryMock.find()).toEqual([modalities])
    spy.mockRestore()
  })

  it("Deve retornar uma modalidade", async () => {
    const modality = Entity.getModality()
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue(modality)
    const getModality = await repository.findOne()
    expect(getModality).toEqual(modality)
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toEqual(modality)
    spy.mockRestore()
  })

  it("Deve Atualizar uma modalidade", async () => {
    const modality = Entity.getModality()
    const spy = jest.spyOn(repositoryMock, "update")
    const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseUpdatedMock)
    const updatedModality = await repository.update(modality.id, modality)
    expect(updatedModality).toEqual(responseUpdatedMock)
    expect(repositoryMock.update).toBeCalledTimes(1)
    expect(repositoryMock.update()).toEqual(responseUpdatedMock)
    spy.mockRestore()
  })

  it("Deve Deletar uma Modalidade", async () => {
    const modality = Entity.getModality()
    const spy = jest.spyOn(repositoryMock, "delete")
    const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseDeleteMock)
    const deleteModality = await repository.delete(modality.id)
    expect(deleteModality).toEqual(responseDeleteMock)
    expect(repositoryMock.delete).toBeCalledTimes(1)
    expect(repositoryMock.delete()).toEqual(responseDeleteMock)
    spy.mockRestore()
  })
})
