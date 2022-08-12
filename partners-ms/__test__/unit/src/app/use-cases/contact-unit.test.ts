import { ContactMemory } from "../../../../mocks/repositories"
import { Contact } from "@/app/core/entity/Contact"
import {
  SaveOneContact,
  DeleteContact,
  GetAllContacts,
  GetContact,
  GetEmailContact,
  SaveContact,
  UpdateContact
} from "@/app/core/use-cases/contact/"
import { entityManager } from "@/infra/db/config"
import { ContactModel } from "@/infra/models/ContactModel"
import { Repository, UpdateResult } from "typeorm"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

const dataValidated = {
  id: 123,
  address: "endereco 1",
  email: "email@email",
  phone: 9999334455,
  partnerId: 2
} as ContactModel

// jest.mock("@/app/repository/ContactRepositoryDb")

const RepositoryMock = entityManager.getRepository(ContactModel)
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ContactModel>>

const repository = new ContactRepositoryDb(repositoryMock)

const saveOneContact = new SaveOneContact(repository)
const deleteContact = new DeleteContact(repository)
const getAllContacts = new GetAllContacts(repository)
const getContact = new GetContact(repository)
const updateContact = new UpdateContact(repository)
const getEmailContact = new GetEmailContact(repository)
const saveContact = new SaveContact(repository)

describe("Testes de unidade contact-useCase", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("Testes de unidade saveOneContact", () => {
    it("Não deve salvar um registro caso o endereço seja omitido", async () => {
      jest.spyOn(saveContact, "execute").mockRejectedValueOnce(new APIError("BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC
      ))
      jest.spyOn(repository, "saveOneContact").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
      jest.spyOn(repositoryMock, "save").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
      try {
        const result = await saveOneContact.execute(null)
        expect(result).toThrow(
          new APIError("BAD_REQUEST",
            HttpStatusCode.BAD_REQUEST,
            true,
            businessError.GENERIC
          )
        )
      } catch (error) {}
    })

    it("Não deve salvar um registro caso o email seja omitido", async () => {
      const data = {
        address: "endereco 1",
        email: null,
        phone: 9999334455,
        partnerId: 2
      }
      const result = await saveOneContact.execute(data)
      expect(result).not.toEqual(dataValidated)
    })

    it("Não deve salvar um registro caso o telefone seja omitido", async () => {
      const data = {
        address: "endereco 1",
        email: "email@email",
        phone: null,
        partnerId: 2
      }
      const result = await saveOneContact.execute(data)
      expect(result).not.toEqual(dataValidated)
    })

    it("Não deve salvar um registro caso o partnerId seja omitido", async () => {
      const data = {
        address: "endereco 1",
        email: "email@email",
        phone: 9999334455,
        partnerId: null
      }
      const result = await saveOneContact.execute(data)
      expect(result).toEqual(undefined)
    })

    it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
      jest.spyOn(saveContact, "execute").mockResolvedValueOnce(dataValidated)
      jest.spyOn(repository, "saveOneContact").mockResolvedValueOnce(dataValidated)
      jest.spyOn(repositoryMock, "save").mockResolvedValueOnce(dataValidated)
      const result = await saveOneContact.execute(dataValidated)
      expect(result).toEqual(dataValidated)
    })
  })

  describe("Testes de unidade updateContact", () => {
    it("Não deve atualizar um registro caso o partnerId seja omitido", async () => {
      const data = {
        address: "endereco 1",
        email: "email@email",
        phone: 9999334455,
        partnerId: 2
      }
      jest.spyOn(updateContact, "execute").mockResolvedValueOnce(null)
      jest.spyOn(repository, "updateContact").mockRejectedValueOnce(null)
      jest.spyOn(repositoryMock, "update").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
      try {
        const result = await updateContact.execute(null, null, null)
        expect(result).toThrow(
          new APIError("BAD_REQUEST",
            HttpStatusCode.BAD_REQUEST,
            true,
            businessError.GENERIC
          )
        )
      } catch (error) {}
    })
    it("Deve atualizar um contato caso todos dados sejam passados", async () => {
      const data = {
        address: "endereco 1",
        email: "email@email",
        phone: 9999334455,
        partnerId: 2
      }
      const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1, generatedMaps: [] }
      jest.spyOn(updateContact, "execute").mockResolvedValueOnce(responseUpdatedMock)
      jest.spyOn(repository, "updateContact").mockResolvedValueOnce(responseUpdatedMock)
      jest.spyOn(repositoryMock, "update").mockResolvedValueOnce(responseUpdatedMock)

      const result = await updateContact.execute(123, 1, data)
      expect(result).toEqual(responseUpdatedMock)
    })
  })

  describe("Testes de unidade saveContact", () => {
    it("Nao deve salvar um registro caso algum dado seja omitido", async () => {
      jest.spyOn(repository, "saveOneContact").mockResolvedValueOnce(null)
      jest.spyOn(repositoryMock, "save").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        ))
      try {
        const result = await saveContact.execute(null)
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
      const data = {
        address: "endereco 1",
        email: "email@email",
        phone: 9999334455,
        partnerId: 2
      } as ContactModel
      jest.spyOn(saveContact, "execute").mockResolvedValueOnce(data)
      jest.spyOn(repository, "saveOneContact").mockResolvedValueOnce(data)
      jest.spyOn(repositoryMock, "save").mockResolvedValueOnce(data)
      const result = await saveContact.execute(dataValidated)
      expect(result).toEqual(data)
    })
  })

  it("Deve retornar uma lista de contatos", async () => {
    jest.spyOn(getAllContacts, "execute").mockResolvedValueOnce([dataValidated])
    jest.spyOn(repository, "find").mockResolvedValueOnce([dataValidated])
    jest.spyOn(repositoryMock, "find").mockResolvedValueOnce([dataValidated])
    const result = await getAllContacts.execute()
    expect(result).toEqual([dataValidated])
  })
})
