import ContactController from "@/app/controllers/ContactController"
import { Contact } from "@/app/core/entity"
import EntityMock from "../../../../mocks/entities"
import { SaveOneContact, GetContact, UpdateContact, GetAllContacts, DeleteContact } from "@/app/core/use-cases/contact"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { ContactModel } from "@/infra/models/ContactModel"
import { entityManager } from "@/infra/db/config"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

jest.mock("@/infra/services/kafka/config")
jest.mock("@/app/core/use-cases/notification/ProducerNotification")

const RepositoryMock = entityManager.getRepository(ContactModel)
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ContactModel>>

const contactRepository = new ContactRepositoryDb(repositoryMock)
const saveOneContact = new SaveOneContact(contactRepository)
const getContact = new GetContact(contactRepository)
const updateOneContact = new UpdateContact(contactRepository)
const getAllContacts = new GetAllContacts(contactRepository)
const deleteContact = new DeleteContact(contactRepository)

describe("Testes de unidade ContactController", () => {
  let res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    next = jest.fn()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("Testes de unidade metodo saveOneContact", () => {
    it("Deve retornar contato salve caso todos dados obrigatórios sejam passados", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const req = {
        body: {
          address: contact.address,
          email: contact.email,
          phone: contact.phone,
          partnerId: contact.partnerId
        } as Contact
      } as any
      jest.spyOn(saveOneContact, "execute").mockResolvedValueOnce(req.body)
      jest.spyOn(contactRepository, "saveOneContact").mockResolvedValueOnce(req.body)
      jest.spyOn(repositoryMock, "save").mockResolvedValueOnce(contact)

      await ContactController.saveOneContact(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.send).toBeCalledWith(contact)
    })

    it("Deve retornar statusCode 400 + error caso nao seja passado nenhum dado", async () => {
      const req = { body: {} } as any
      jest.spyOn(saveOneContact, "execute").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
      jest.spyOn(contactRepository, "saveOneContact").mockRejectedValueOnce(
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
      await ContactController.saveOneContact(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    })
  })

  describe("Testes de unidade metodo getContact", () => {
    it("Deve retornar statusCode 400 + error caso nao seja passado um id", async () => {
      const req = { params: { id: null } } as any
      await ContactController.getContact(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    })

    it("Deve retornar um contato caso o id exista no banco de dados", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const req = { params: { id: 1 } } as any
      jest.spyOn(getContact, "execute").mockResolvedValueOnce(contact)
      jest.spyOn(contactRepository, "findOne").mockResolvedValueOnce(contact)
      jest.spyOn(repositoryMock, "findOne").mockResolvedValueOnce(contact)
      await ContactController.getContact(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith(contact)
    })
  })

  describe("Testes de unidade metodo getAllContacts", () => {
    it("Deve retornar statusCode 404 caso nao exista dados no banco", async () => {
      const req = { } as any
      jest.spyOn(getAllContacts, "execute").mockReturnThis()
      jest.spyOn(contactRepository, "find").mockReturnThis()
      jest.spyOn(repositoryMock, "find").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      )
      await ContactController.getAllContacts(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      )
    })

    it("Deve retornar uma lista de contatos", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const req = { } as any
      jest.spyOn(getAllContacts, "execute").mockReturnThis()
      jest.spyOn(contactRepository, "find").mockReturnThis()
      jest.spyOn(repositoryMock, "find").mockResolvedValue([contact])
      await ContactController.getAllContacts(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith([contact])
    })
  })
  describe("Testes de unidade metodo updateContact", () => {
    it("Deve retornar statusCode 400 + error caso nao seja passado um id", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const req = {
        params: { id: null },
        body: {
          address: contact.address,
          email: contact.email,
          phone: contact.phone,
          partnerId: contact.partnerId
        } as Contact
      } as any
      await ContactController.updateContact(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    })

    it("Deve retornar statusCode 400 + error caso nao seja passado um partnerId", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const req = {
        params: { id: 1 },
        body: {
          address: contact.address,
          email: contact.email,
          phone: contact.phone,
          partnerId: null
        } as Contact
      } as any
      await ContactController.updateContact(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    })

    it("Deve retornar statusCode 404 + error caso nao seja passado um partnerId", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const req = {
        params: { id: 1 },
        body: {
          address: contact.address,
          email: contact.email,
          phone: contact.phone,
          partnerId: contact.partnerId
        } as Contact
      } as any
      jest.spyOn(updateOneContact, "execute").mockResolvedValueOnce(contact)
      jest.spyOn(contactRepository, "updateContact").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      )
      jest.spyOn(repositoryMock, "update").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        ))
      await ContactController.updateContact(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      )
    })
    it("Deve atualizar um contato caso todos dados obrigatorios sejam passados", async () => {
      const contact = EntityMock.getContact() as ContactModel
      const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 0, generatedMaps: [] }
      const req = {
        params: { id: 1 },
        body: {
          address: contact.address,
          email: contact.email,
          phone: contact.phone,
          partnerId: contact.partnerId
        } as Contact
      } as any
      jest.spyOn(updateOneContact, "execute").mockResolvedValueOnce(req.body)
      jest.spyOn(contactRepository, "updateContact").mockResolvedValueOnce(req.body)
      jest.spyOn(repositoryMock, "update").mockResolvedValueOnce(responseUpdatedMock)
      await ContactController.updateContact(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.send).toBeCalledWith(responseUpdatedMock)
    })
  })

  describe("Testes de unidade metodo deleteContact", () => {
    it("Deve retornar statusCode 400 + error caso nao seja passado um id", async () => {
      const req = {
        params: { id: null }
      } as any
      await ContactController.deleteContact(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        ))
    })

    it("Deve retornar statusCode 204 e deletar um contato caso seja passado um id", async () => {
      const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
      const req = {
        params: { id: 1 }
      } as any
      jest.spyOn(deleteContact, "execute").mockResolvedValueOnce(req.params.id)
      jest.spyOn(contactRepository, "delete").mockResolvedValueOnce(req.params.id)
      jest.spyOn(repositoryMock, "delete").mockResolvedValueOnce(responseDeleteMock)
      await ContactController.deleteContact(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseDeleteMock)
    })
  })
})
