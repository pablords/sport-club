// @ts-nocheck

import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { ContactModel } from "@/infra/models/ContactModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import Entity from "../../../../mocks/entities"

// jest.mock("@/app/repository/ContactRepositoryDb")

const RepositoryMock = entityManager.getRepository(ContactModel)
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ContactModel>>

const repository = new ContactRepositoryDb(repositoryMock)

describe("Testes unitários de Repositorio de contatos", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Deve salvar um contato", async () => {
    const contact = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "save")
    spy.mockReturnValue(contact)
    const savedContact = await repository.saveOneContact(contact)
    expect(savedContact).toEqual(contact)
    expect(repositoryMock.save).toBeCalledTimes(1)
    expect(repositoryMock.save(contact)).toEqual(contact)
    spy.mockRestore()
  })

  it("Deve retornar o primeiro email da lista de emails", async () => {
    const contacts = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue("email@teste.com")
    const getEmail = await repository.findEmail([contacts])
    expect(getEmail).toEqual("email@teste.com")
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toBe("email@teste.com")
    spy.mockRestore()
  })

  it("Deve salvar uma lista de contatos", async () => {
    const contact = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "save")
    spy.mockReturnValue([contact])
    const savedContact = await repository.createMany([contact])
    expect(savedContact).toEqual([contact])
    expect(repositoryMock.save).toBeCalledTimes(1)
    expect(repositoryMock.save([contact])).toEqual([contact])
    spy.mockRestore()
  })

  it("Deve retornar uma lista de contatos", async () => {
    const contacts = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "find")
    spy.mockReturnValue([contacts])
    const getContacts = await repository.find()
    expect(getContacts).toEqual([contacts])
    expect(repositoryMock.find).toBeCalledTimes(1)
    expect(repositoryMock.find()).toEqual([contacts])
    spy.mockRestore()
  })

  it("Deve retornar um contato", async () => {
    const contact = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "findOne")
    spy.mockReturnValue(contact)
    const getContact = await repository.findOne()
    expect(getContact).toEqual(contact)
    expect(repositoryMock.findOne).toBeCalledTimes(1)
    expect(repositoryMock.findOne()).toEqual(contact)
    spy.mockRestore()
  })

  it("Deve Atualizar um contato", async () => {
    const contact = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "update")
    const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseUpdatedMock)
    const updatedContact = await repository.updateContact(contact.id, contact.partnerId, contact)
    expect(updatedContact).toEqual(responseUpdatedMock)
    expect(repositoryMock.update).toBeCalledTimes(1)
    expect(repositoryMock.update()).toEqual(responseUpdatedMock)
    spy.mockRestore()
  })

  it("Deve Deletar um contato", async () => {
    const contact = Entity.getContact()
    const spy = jest.spyOn(repositoryMock, "delete")
    const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
    spy.mockReturnValue(responseDeleteMock)
    const deleteContact = await repository.delete(contact.id)
    expect(deleteContact).toEqual(responseDeleteMock)
    expect(repositoryMock.delete).toBeCalledTimes(1)
    expect(repositoryMock.delete()).toEqual(responseDeleteMock)
    spy.mockRestore()
  })
})
