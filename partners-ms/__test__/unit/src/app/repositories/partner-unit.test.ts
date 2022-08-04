// @ts-nocheck

import { PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { PartnerModel } from "@/infra/models/PartnerModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import Entity from "../../../../mocks/entities"

// jest.mock("@/app/repository/ContactRepositoryDb")

const RepositoryMock = entityManager.getRepository(PartnerModel) as jest.Mock<Repository<PartnerModel>>
const repositoryMock = RepositoryMock as jest.Mocked<Repository<PartnerModel>>

const repository = new PartnerRepositoryDb(repositoryMock)

describe("Testes unitários de Repositorio de sócios", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Deve salvar um sócios", async () => {
    const partner = Entity.getPartner()
    const spy = jest.spyOn(repositoryMock, "save")
    spy.mockReturnValue(partner)
    const savedPartner = await repository.create(partner)
    expect(savedPartner).toEqual(partner)
    expect(repositoryMock.save).toBeCalledTimes(1)
    expect(repositoryMock.save(partner)).toEqual(partner)
    spy.mockRestore()
  })

  it("Deve retornar uma lista de sócios", async () => {
    const partners = Entity.getPartner()
    const spy = jest.spyOn(repositoryMock, "find")
    spy.mockReturnValue([partners])
    const getPartners = await repository.findAll()
    expect(getPartners).toEqual([partners])
    expect(repositoryMock.find).toBeCalledTimes(1)
    expect(repositoryMock.find()).toEqual([partners])
    spy.mockRestore()
  })

  it("Deve retornar uma sócio", async () => {
    const partner = Entity.getPartner()
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue(partner)
    const getModality = await repository.findOne()
    expect(getModality).toEqual(partner)
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toEqual(partner)
    spy.mockRestore()
  })

  it("Deve retornar um sócio mais relacao com contatos", async () => {
    const partner = Entity.getPartner()
    const contacts = Entity.getContact()
    const modkResponseData = {
      partner: partner,
      contacts: [contacts]
    }
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue(modkResponseData)
    const getPartner = await repository.findEmail(partner)
    expect(getPartner).toEqual(modkResponseData)
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toEqual(modkResponseData)
    spy.mockRestore()
  })

  it("Deve retornar um sócio mais relacoes passando um payload de relations", async () => {
    const partner = Entity.getPartner()
    const contacts = Entity.getContact()
    const modalities = Entity.getModality()
    const contracts = Entity.getContract()
    const modkResponseData = {
      partner: partner,
      contacts: [contacts],
      modalities: [modalities],
      contracts: [contracts]
    }
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue(modkResponseData)
    const getPartner = await repository.findRelationsOne(partner.id, ["contacts", "contracts", "modalities"])
    expect(getPartner).toEqual(modkResponseData)
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toEqual(modkResponseData)
    spy.mockRestore()
  })

  it("Deve Atualizar um sócio", async () => {
    const partner = Entity.getPartner()
    const spy = jest.spyOn(repositoryMock, "update")
    const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseUpdatedMock)
    const updatedModality = await repository.update(partner.id, partner)
    expect(updatedModality).toEqual(responseUpdatedMock)
    expect(repositoryMock.update).toBeCalledTimes(1)
    expect(repositoryMock.update()).toEqual(responseUpdatedMock)
    spy.mockRestore()
  })

  it("Deve Deletar um sócio", async () => {
    const partner = Entity.getPartner()
    const spy = jest.spyOn(repositoryMock, "delete")
    const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseDeleteMock)
    const deleteModality = await repository.delete(partner.id)
    expect(deleteModality).toEqual(responseDeleteMock)
    expect(repositoryMock.delete).toBeCalledTimes(1)
    expect(repositoryMock.delete()).toEqual(responseDeleteMock)
    spy.mockRestore()
  })
})
