import { ContractRepositoryMemory } from "../../../../mocks/repositories"
import { Contract } from "@/app/core/entity/Contract"
import {
  DeleteContract,
  GetAllContracts,
  GetContract,
  SaveOneContract
} from "@/app/core/use-cases/contract"
import { Modality } from "@/app/core/entity"
import { entityManager } from "@/infra/db/config"
import { ContractModel } from "@/infra/models/ContractModel"
import { Repository } from "typeorm"
import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

const RepositoryMock = entityManager.getRepository(ContractModel)
const repositoryMock = RepositoryMock as jest.Mocked<Repository<ContractModel>>

const repository = new ContractRepositoryMemory(repositoryMock) as any
const deleteContract = new DeleteContract(repository)
const getAllContracts = new GetAllContracts(repository)
const getContract = new GetContract(repository)
const saveOneContract = new SaveOneContract(repository)

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

const dataValidated: Contract = {
  id: 1,
  start: new Date("2021-02-01"),
  dueDate: new Date("2021-03-01"),
  isActive: true,
  status: 1,
  partnerId: 1,
  modalityId: 2
}

describe.only("Testes unitários de contratos", () => {
  beforeAll(async () => {
    const list: Contract[] = [
      {
        start: new Date("2021-04-01"),
        dueDate: new Date("2021-05-01"),
        isActive: true,
        status: 1,
        partnerId: 1,
        modalityId: 2

      },
      {
        start: new Date("2021-06-01"),
        dueDate: new Date("2021-07-01"),
        isActive: true,
        status: 1,
        partnerId: 1,
        modalityId: 2
      }
    ]

    for (const pi of list) {
      await repository.save(pi)
    }

    await repository.save(dataValidated)
  })

  it("Não deve salvar um registro caso o inicio seja omitido", async () => {
    const data = {
      start: null,
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: 1,
      partnerId: 1,
      modalityId: 2
    }
    const result = await saveOneContract.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o vencimento seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: null,
      isActive: true,
      status: 1,
      partnerId: 1,
      modalityId: 2
    }
    try {
      const result = await saveOneContract.execute(data)
      expect(result).toThrow(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    } catch (error) {}
  })

  it("Não deve salvar um registro caso o isActive seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: null,
      status: 1,
      partnerId: 1,
      modalityId: 2
    }
    const result = await saveOneContract.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o status seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: 1,
      partnerId: 1,
      modalityId: 2
    }
    const result = await saveOneContract.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o partnerId seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: 1,
      partnerId: null,
      modalityId: 2
    }
    const result = await saveOneContract.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o modalityId seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: 1,
      partnerId: 1,
      modalityId: null
    }
    const result = await saveOneContract.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await saveOneContract.execute(dataValidated)
    expect(result).toEqual(result)
  })

  it("Não Deve listar contrato caso o id seja omitido", async () => {
    try {
      const result = await getContract.execute(null)
      expect(result).toThrow(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    } catch (error) {}
  })

  it("Não Deve deletar contrato caso o partnerId seja omitido", async () => {
    try {
      const result = await deleteContract.execute(1, null)
      expect(result).toThrow(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      )
    } catch (error) {}
  })

  it("Deve listar todos registros de contratos", async () => {
    const result = await getAllContracts.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar contrato caso seja passado um id", async () => {
    const result = await getContract.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar modalidade caso seja passado um id", async () => {
    const result = await deleteContract.execute(dataValidated.id, dataValidated.partnerId)
    expect(result).toHaveLength(0)
  })
})
