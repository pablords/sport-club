import ContractController from "@/app/controllers/ContractController"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"
import { SaveOneContract, UpdateContractStatus, GetContract, GetAllContracts, DeleteContract } from "@/app/core/use-cases/contract"
import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { entityManager } from "@/infra/db/config"
import { ContractModel } from "@/infra/models/ContractModel"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import EntityMock from "../../../../mocks/entities"
import { Contract } from "@/app/core/entity"

// jest.mock("@/app/repository/ContractRepositoryDb")

const RepositoryMock = entityManager.getRepository(ContractModel)
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ContractModel>>

const contractRepository = new ContractRepositoryDb(repositoryMock)
const saveOneContract = new SaveOneContract(contractRepository)
const updateContractStatus = new UpdateContractStatus(contractRepository)
const getContract = new GetContract(contractRepository)
const getAllContracts = new GetAllContracts(contractRepository)
const deleteContract = new DeleteContract(contractRepository)

describe("Testes unitário ContractController", () => {
  let res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    next = jest.fn()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("Testes de unidade metodo saveOneContract", () => {
    it("Deve retornar false caso nao seja passado um status", async () => {
      const req = {
        body: {
          start: new Date("2021-02-01"),
          dueDate: new Date("2021-03-01"),
          isActive: true,
          status: null,
          partnerId: 1,
          modalityId: 2
        } as Contract
      } as any
      jest.spyOn(saveOneContract, "execute").mockResolvedValue(req.body)
      await ContractController.saveOneContract(req, res, next)
      expect(res.send).toBeCalledWith(false)
    })

    it("Deve retornar statusCode 400 + error caso nao seja passado um dueDate", async () => {
      const req = {
        body: {
          start: new Date("2021-02-01"),
          dueDate: null,
          isActive: true,
          status: "ativo",
          partnerId: 1,
          modalityId: 2
        } as Contract
      } as any
      jest.spyOn(saveOneContract, "execute").mockResolvedValue(req.body)

      await ContractController.saveOneContract(req, res, next)
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

    it("deve salvar um contrato caso todos dados obrigatorios sejam passados", async () => {
      const contract = EntityMock.getContract() as ContractModel
      const req = {
        body: {
          start: "2021-02-01",
          dueDate: "2021-03-01",
          isActive: true,
          status: "ativo",
          partnerId: 1,
          modalityId: 2
        }
      } as any
      jest.spyOn(saveOneContract, "execute").mockResolvedValueOnce(req.body)
      jest.spyOn(contractRepository, "create").mockResolvedValueOnce(req.body)
      jest.spyOn(repositoryMock, "save").mockResolvedValueOnce(contract)

      await ContractController.saveOneContract(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.send).toBeCalledWith(contract)
    })
  })

  describe("Testes de unidade metodo updateContractStatus", () => {
    it("Deve retornar statusCode 404 + error caso nao seja passado um partnerId", async () => {
      const req = {
        params: { id: 1 },
        body: {
          start: "2021-02-01",
          dueDate: "2021-03-01",
          isActive: true,
          status: "ativo",
          partnerId: null,
          modalityId: 2
        }
      } as any
      jest.spyOn(updateContractStatus, "execute").mockResolvedValueOnce(req)
      await ContractController.updateContractStatus(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      )
    })
    it("Deve retornar statusCode 204 e atualizar um contato", async () => {
      const contract = EntityMock.getContract() as ContractModel
      const req = {
        params: { id: 1 },
        body: {
          start: "2021-02-01",
          dueDate: "2021-03-01",
          isActive: true,
          status: "ativo",
          partnerId: 1,
          modalityId: 2
        }
      } as any
      const responseUpdatedMock: UpdateResult = { raw: "any_value", affected: 0, generatedMaps: [] }
      jest.spyOn(updateContractStatus, "execute").mockResolvedValueOnce(req)
      jest.spyOn(contractRepository, "updateWithPartner").mockResolvedValueOnce(req)
      jest.spyOn(repositoryMock, "update").mockResolvedValueOnce(responseUpdatedMock)
      await ContractController.updateContractStatus(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseUpdatedMock)
    })
  })

  describe("Testes de unidade metodo getContract", () => {
    it("Deve retornar statusCode 400 + error caso nao seja passado um id", async () => {
      const req = { params: { id: null } } as any
      await ContractController.getContract(req, res, next)
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

    it("Deve retornar statusCode 404 + error caso nao seja econtrado um contrato no banco de dados", async () => {
      const req = { params: { id: 1 } } as any
      jest.spyOn(getContract, "execute").mockResolvedValueOnce(req.params.id)
      jest.spyOn(contractRepository, "findOne").mockResolvedValueOnce(req.params.id)
      jest.spyOn(repositoryMock, "findOne").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      )
      await ContractController.getContract(req, res, next)
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

    it("Deve retornar um contrato caso seja passaod um id", async () => {
      const contract = EntityMock.getContract() as ContractModel
      const req = { params: { id: 1 } } as any
      jest.spyOn(getContract, "execute").mockResolvedValueOnce(req.params.id)
      jest.spyOn(contractRepository, "findOne").mockResolvedValueOnce(req.params.id)
      jest.spyOn(repositoryMock, "findOne").mockResolvedValueOnce(contract)
      await ContractController.getContract(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith(contract)
    })
  })

  describe("Testes de unidade metodo getAllContracts", () => {
    it("Deve retornar statusCode 404 caso nao seja encontrado nenhum contrato", async () => {
      const req = { } as any
      jest.spyOn(getAllContracts, "execute").mockReturnThis()
      jest.spyOn(contractRepository, "find").mockReturnThis()
      jest.spyOn(repositoryMock, "find").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      )
      await ContractController.getAllContracts(req, res, next)
      expect(res.status).toBeCalledWith(404)
      expect(res.send).toBeCalledWith(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      )
    })

    it("Deve retornar uma lista de contatos", async () => {
      const req = { } as any
      const contract = EntityMock.getContract() as ContractModel
      jest.spyOn(getAllContracts, "execute").mockReturnThis()
      jest.spyOn(contractRepository, "find").mockReturnThis()
      jest.spyOn(repositoryMock, "find").mockResolvedValueOnce([contract])
      await ContractController.getAllContracts(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith([contract])
    })
  })

  describe("Testes de unidade metodo deleteContract", () => {
    it("Deve retornar statusCode 400 caso nao seja passado um partnerId", async () => {
      const req = {
        body: {
          partnerId: null
        },
        params: { id: 1 }
      } as any
      jest.spyOn(deleteContract, "execute").mockResolvedValueOnce(req)
      jest.spyOn(contractRepository, "deleteWithPartner").mockResolvedValueOnce(req)
      jest.spyOn(repositoryMock, "delete").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
      await ContractController.deleteContract(req, res, next)
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

    it("Deve deletar um contrato", async () => {
      const req = {
        body: {
          partnerId: 1
        },
        params: { id: 1 }
      } as any
      const responseDeleteMock: DeleteResult = { raw: "any_value", affected: 1 }
      jest.spyOn(deleteContract, "execute").mockResolvedValueOnce(req)
      jest.spyOn(contractRepository, "deleteWithPartner").mockResolvedValueOnce(req)
      jest.spyOn(repositoryMock, "delete").mockResolvedValueOnce(responseDeleteMock)
      await ContractController.deleteContract(req, res, next)
      expect(res.status).toBeCalledWith(204)
      expect(res.send).toBeCalledWith(responseDeleteMock)
    })
  })
})
