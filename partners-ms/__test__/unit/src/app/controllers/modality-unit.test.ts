import ModalityController from "@/app/controllers/ModalityController"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"
import EntityMock from "../../../../mocks/entities"
import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { ModalityModel } from "@/infra/models/ModalityModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { SaveModality, GetModality, GetAllmodality, UpdateModality, DeleteModality } from "@/app/core/use-cases/modality"

const RepositoryMock = entityManager.getRepository(ModalityModel)
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ModalityModel>>

const modalityRepository = new ModalityRepositoryDb(repositoryMock)
const saveModality = new SaveModality(modalityRepository)
const getModality = new GetModality(modalityRepository)
const getAllmodality = new GetAllmodality(modalityRepository)
const updateModality = new UpdateModality(modalityRepository)
const deleteModality = new DeleteModality(modalityRepository)

describe("Testes unitário ModalityController", () => {
  let res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    next = jest.fn()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe("Testes de unidade metodo saveModality", () => {
    it("deve retornar statusCode 400 caso nao seja passado uma modalidade", async () => {
      const req = {
        body: {}
      } as any
      const modality = EntityMock.getModality()
      jest.spyOn(saveModality, "execute").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      )
      jest.spyOn(modalityRepository, "createMany").mockRejectedValueOnce(
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
      await ModalityController.saveModality(req, res, next)
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

    it("deve salvar uma modalidade caso todos dados obrigatorios sejam passados", async () => {
      const req = {
        body: {
          name: "futebol",
          description: "esporte"
        }
      } as any
      const modality = EntityMock.getModality() as ModalityModel
      jest.spyOn(saveModality, "execute").mockResolvedValueOnce(req.body)
      jest.spyOn(modalityRepository, "createMany").mockResolvedValueOnce(req.body)
      jest.spyOn(repositoryMock, "save").mockResolvedValueOnce(modality)
      await ModalityController.saveModality(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.send).toBeCalledWith(modality)
    })
  })
  describe("Testes de unidade metodo getModality", () => {
    it("Deve retornar erro 400 caso não seja passado um payload", async () => {
      const req = { params: { id: undefined } } as any
      const next = jest.fn()
      await ModalityController.getModality(req, res, next)
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
    it("Deve retornar uma modalidade caso seja passado um id", async () => {
      const req = { params: { id: 1 } } as any
      const modality = EntityMock.getModality() as ModalityModel
      const next = jest.fn()
      jest.spyOn(getModality, "execute").mockResolvedValueOnce(req.body)
      jest.spyOn(modalityRepository, "findOne").mockResolvedValueOnce(req.body)
      jest.spyOn(repositoryMock, "findOne").mockResolvedValueOnce(modality)
      await ModalityController.getModality(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith(modality)
    })
  })

  describe("Testes de unidade metodo getAllModality", () => {
    it("Deve retornar statusCode 404 caso nao seja econtrado nenhuma modalidade", async () => {
      const req = { } as any
      const modality = EntityMock.getModality() as ModalityModel
      const next = jest.fn()
      jest.spyOn(getAllmodality, "execute").mockResolvedValueOnce(req.body)
      jest.spyOn(modalityRepository, "find").mockResolvedValueOnce(req.body)
      jest.spyOn(repositoryMock, "find").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND
        )
      )
      await ModalityController.getAllModality(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND
        )
      )
    })

    it("Deve retornar uma lista de modalidades", async () => {
      const req = { } as any
      const modality = EntityMock.getModality() as ModalityModel
      const next = jest.fn()
      jest.spyOn(getAllmodality, "execute").mockReturnThis()
      jest.spyOn(modalityRepository, "find").mockReturnThis()
      jest.spyOn(repositoryMock, "find").mockResolvedValueOnce([modality])
      await ModalityController.getAllModality(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith([modality])
    })
  })
  describe("Testes de unidade metodo updateModality", () => {
    it("deve atualizar uma modalidade", async () => {
      const req = {
        body: {
          name: "futebol",
          description: "esporte"
        },
        params: { id: 1 }
      } as any
      const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 1, generatedMaps: [] }
      jest.spyOn(updateModality, "execute").mockResolvedValueOnce(req)
      jest.spyOn(modalityRepository, "update").mockResolvedValueOnce(req)
      jest.spyOn(repositoryMock, "update").mockResolvedValueOnce(responseUpdatedMock)
      await ModalityController.updateModality(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseUpdatedMock)
    })

    it("Deve retornar erro 400 caso não seja passado um payload", async () => {
      const req = { body: {}, params: { id: undefined } } as any
      await ModalityController.updateModality(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    })
  })

  describe("Testes de unidade metodo deleteModality", () => {
    it("Deve retornar erro 400 caso não seja passado um id", async () => {
      const req = { params: { id: undefined } } as any
      const next = jest.fn()
      jest.spyOn(deleteModality, "execute").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
      await ModalityController.deleteModality(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    })

    it("Deve deletar uma modalidade casos eja passado um id", async () => {
      const req = { params: { id: 1 } } as any
      const next = jest.fn()
      const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
      jest.spyOn(deleteModality, "execute").mockResolvedValueOnce(req.params.id)
      jest.spyOn(modalityRepository, "delete").mockResolvedValueOnce(req.params.id)
      jest.spyOn(repositoryMock, "delete").mockResolvedValueOnce(responseDeleteMock)
      await ModalityController.deleteModality(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseDeleteMock)
    })
  })
})
