// @ts-nocheck

import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { ContractModel } from "@/infra/models/ContractModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import Entity from "../../../../mocks/entities"

// jest.mock("@/app/repository/ContactRepositoryDb")

const RepositoryMock = entityManager.getRepository(ContractModel) as jest.Mock<Repository<ContractModel>>
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ContractModel>>

const repository = new ContractRepositoryDb(repositoryMock)

describe("Testes unitários de Repositorio de contratos", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Deve salvar um contrato", async () => {
    const contract = Entity.getContract()
    const spy = jest.spyOn(repositoryMock, "save")
    spy.mockReturnValue(contract)
    const savedContract = await repository.create(contract)
    expect(savedContract).toEqual(contract)
    expect(repositoryMock.save).toBeCalledTimes(1)
    expect(repositoryMock.save(contract)).toEqual(contract)
    spy.mockRestore()
  })

  it("Deve retornar uma lista de contratos", async () => {
    const contracts = Entity.getContract()
    const spy = jest.spyOn(repositoryMock, "find")
    spy.mockReturnValue([contracts])
    const getContracts = await repository.find()
    expect(getContracts).toEqual([contracts])
    expect(repositoryMock.find).toBeCalledTimes(1)
    expect(repositoryMock.find()).toEqual([contracts])
    spy.mockRestore()
  })

  it("Deve retornar um contrato", async () => {
    const contract = Entity.getContract()
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue(contract)
    const getContract = await repository.findOne()
    expect(getContract).toEqual(contract)
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toEqual(contract)
    spy.mockRestore()
  })

  it("Deve Atualizar um contrato", async () => {
    const contract = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "update")
    const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseUpdatedMock)
    const updatedContract = await repository.update(contract.id, contract)
    expect(updatedContract).toEqual(responseUpdatedMock)
    expect(repositoryMock.update).toBeCalledTimes(1)
    expect(repositoryMock.update()).toEqual(responseUpdatedMock)
    spy.mockRestore()
  })

  it("Deve Atualizar um contrato passando um partnerId", async () => {
    const contract = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "update")
    const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseUpdatedMock)
    const updatedContract = await repository.updateWithPartner(contract.id, contract.partnerId, contract)
    expect(updatedContract).toEqual(responseUpdatedMock)
    expect(repositoryMock.update).toBeCalledTimes(1)
    expect(repositoryMock.update()).toEqual(responseUpdatedMock)
    spy.mockRestore()
  })

  it("Deve Deletar um contrato", async () => {
    const contract = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "delete")
    const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseDeleteMock)
    const deleteContract = await repository.delete(contract.id)
    expect(deleteContract).toEqual(responseDeleteMock)
    expect(repositoryMock.delete).toBeCalledTimes(1)
    expect(repositoryMock.delete()).toEqual(responseDeleteMock)
    spy.mockRestore()
  })

  it("Deve Deletar um contrato passando um partnerId", async () => {
    const contract = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "delete")
    const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseDeleteMock)
    const deleteContract = await repository.deleteWithPartner(contract.id, contract.partnerId)
    expect(deleteContract).toEqual(responseDeleteMock)
    expect(repositoryMock.delete).toBeCalledTimes(1)
    expect(repositoryMock.delete()).toEqual(responseDeleteMock)
    spy.mockRestore()
  })
})
