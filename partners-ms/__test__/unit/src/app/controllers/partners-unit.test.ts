import PartnerController from "@/app/controllers/PartnerController"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"
import EntityMock from "../../../../mocks/entities"
import { entityManager } from "@/infra/db/config"
import { PartnerModel } from "@/infra/models/PartnerModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { SavePartner, GetPartner, UpdatePartner, DeletePartner, GetAllPartner } from "@/app/core/use-cases/partner"

const partner = EntityMock.getPartner() as PartnerModel

const PartnerRepositoryMock = entityManager.getRepository(PartnerModel)
const partnerRepositoryMock = PartnerRepositoryMock as jest.Mocked<Repository<PartnerModel>>
const partnerRepositoryDb = new PartnerRepositoryDb(partnerRepositoryMock)
const savePartner = new SavePartner(partnerRepositoryDb)
const getPartner = new GetPartner(partnerRepositoryDb)
const updatePartner = new UpdatePartner(partnerRepositoryDb)
const deletePartner = new DeletePartner(partnerRepositoryDb)
const getAllPartner = new GetAllPartner(partnerRepositoryDb)

describe("Testes de unidade PartnerController", () => {
  let res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    next = jest.fn()
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })
  describe("Testes de unidade metodo savePartner", () => {
    it("Deve retornar statusCode 400 + error caso nao seja passado um payload no body", async () => {
      const req = { body: undefined } as any
      await PartnerController.savePartner(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    })

    it("Deve retornar statusCode 400 + error caso nao seja passado um payload no body", async () => {
      const req = { body: partner } as any
      jest.spyOn(savePartner, "execute").mockResolvedValue(req.body)
      jest.spyOn(partnerRepositoryDb, "create").mockResolvedValue(req.body)
      jest.spyOn(partnerRepositoryMock, "save").mockResolvedValue(req.body)
      await PartnerController.savePartner(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.send).toBeCalledWith(req.body)
    })
  })
  describe("Testes de unidade metodo getPartner", () => {
    it("Deve retornar erro 400 caso não seja passado um payload", async () => {
      const req = { params: { id: undefined } } as any
      await PartnerController.getPartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    })
    it("Deve retornar um sócio caso seja passado um id", async () => {
      const req = { params: { id: 1 } } as any
      jest.spyOn(getPartner, "execute").mockResolvedValue(partner)
      jest.spyOn(partnerRepositoryDb, "findOne").mockResolvedValue(partner)
      jest.spyOn(partnerRepositoryMock, "findOne").mockResolvedValue(partner)
      await PartnerController.getPartner(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith(partner)
    })
  })

  describe("Testes de unidade metodo updatePartner", () => {
    it("Deve retornar erro 400 caso não seja passado um payload", async () => {
      const req = { body: {}, params: { id: undefined } } as any
      await PartnerController.updatePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    })
    it("Deve retornar statusCode 204 ao atualizar sócio", async () => {
      const req = { body: { ...partner }, params: { id: 1 } } as any
      const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 0, generatedMaps: [] }
      jest.spyOn(updatePartner, "execute").mockResolvedValue(req.body)
      jest.spyOn(partnerRepositoryDb, "update").mockResolvedValue(req.body)
      jest.spyOn(partnerRepositoryMock, "update").mockResolvedValue(responseUpdatedMock)
      await PartnerController.updatePartner(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseUpdatedMock)
    })
  })

  describe("Testes de unidade metodo deletePartner", () => {
    it("Deve retornar erro 400 caso não seja passado um id", async () => {
      const req = { params: { id: undefined } } as any
      await PartnerController.deletePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
    })

    it("Deve deletar um sócio caso seja passado um id", async () => {
      const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
      const req = { params: { id: 1 } } as any
      jest.spyOn(deletePartner, "execute").mockResolvedValue(req.body)
      jest.spyOn(partnerRepositoryDb, "delete").mockResolvedValue(req.body)
      jest.spyOn(partnerRepositoryMock, "delete").mockResolvedValue(responseDeleteMock)
      await PartnerController.deletePartner(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseDeleteMock)
    })
  })

  describe("Testes de unidade metodo getAllPartners", () => {
    it("deve retiornar uma lista de sócios", async () => {
      const req = { } as any
      jest.spyOn(getAllPartner, "execute").mockResolvedValue([partner])
      jest.spyOn(partnerRepositoryDb, "find").mockResolvedValue([partner])
      jest.spyOn(partnerRepositoryMock, "find").mockResolvedValue([partner])
      await PartnerController.getAllPartners(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith([partner])
    })

    it("deve retiornar statusCode 500 + error caso ocorra erro ao conectar com banco", async () => {
      const req = { } as any
      jest.spyOn(getAllPartner, "execute").mockResolvedValue([partner])
      jest.spyOn(partnerRepositoryDb, "find").mockResolvedValue([partner])
      jest.spyOn(partnerRepositoryMock, "find").mockRejectedValue(
        new APIError("INTERNAL_SERVER",
          HttpStatusCode.INTERNAL_SERVER,
          true,
          businessError.GENERIC
        )
      )
      await PartnerController.getAllPartners(req, res, next)
      expect(res.status).toBeCalledWith(500)
      expect(res.send).toBeCalledWith(
        new APIError("INTERNAL_SERVER",
          HttpStatusCode.INTERNAL_SERVER,
          true,
          businessError.GENERIC
        )
      )
    })
  })
})
