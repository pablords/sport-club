import { Contract } from "@/app/core/entity"
import { Repository, UpdateResult } from "typeorm"
import { IRepositoryDbMethodsBase } from "@/app/repository/RepositoryBase"
import { ContractModel } from "@/infra/models/ContractModel"

export interface IContractRepositoryDbMethods
    extends IRepositoryDbMethodsBase<Contract> {
    deleteWithPartner(id: number, partnerId: number): Promise<any>;
    updateWithPartner(
        id: number,
        partnerId: number,
        contract: Contract
    ): Promise<any>;
}

const contractList: Contract[] = []
export class ContractRepositoryMemory implements Partial<IContractRepositoryDbMethods> {
  constructor (private repository: Repository<ContractModel>) {
    this.repository = repository
  }

  async save (contract: Contract) {
    return Promise.resolve().then(() => {
      contract.id = Math.floor(Math.random() * 1000)
      contractList.push(contract)
      return contract
    }).catch((err) => {
      return err
    })
  }

  async findOne (id: number) {
    return Promise.resolve().then(() => {
      return contractList.find(pi => pi.id === id)
    }).catch((err) => {
      return err
    })
  }

  async delete (id: number) {
    return Promise.resolve().then(() => {
      const thisContract = contractList.find(pi => pi.id === id)
      const result = contractList.splice(thisContract.id, 1)
      return result
    }).catch((err) => {
      return err
    })
  }

  async create (contract: Contract) {
    return Promise.resolve().then(() => {
      contract.id = Math.floor(Math.random() * 1000)
      contractList.push(contract)
      return contract
    }).catch((err) => {
      return err
    })
  }

  async deleteWithPartner (id: number, partnerId: number): Promise<any> {
    return Promise.resolve().then(() => {
      const thisContract = contractList.find(pi => pi.partnerId === partnerId)
      const result = contractList.splice(thisContract.id, 1)
      return result
    }).catch((err) => {
      return err
    })
  }

  async find (filter?: object) {
    return Promise.resolve().then(() => {
      return contractList
    }).catch((err) => {
      return err
    })
  }

  async updateWithPartner (id: number, partnerId: number, contract: Contract): Promise<any> {
    return Promise.resolve().then(() => {
      const thisContract = contractList.map(e => {
        if (e.id == id && e.partnerId == partnerId) {
          return e == contract
        }
        return e
      })
      return thisContract
    }).catch((err) => {
      return err
    })
  }

  async update (id: number, contract: Contract): Promise<UpdateResult> {
    return Promise.resolve().then(() => {
      const thisContract = contractList.map(e => {
        if (e.id == id) {
          return e == contract
        }
        return e
      })
      return thisContract
    }).catch((err) => {
      return err
    })
  }
}
