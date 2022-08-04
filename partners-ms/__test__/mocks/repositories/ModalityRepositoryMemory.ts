import { Modality } from "@/app/core/entity"
import { IRepositoryDbMethodsBase } from "@/app/repository/RepositoryBase"

const modalityList: Modality[] = []

export interface IModalityRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Modality>> {
  createMany(modality: Modality[]): Promise<Modality[]>
}

export class ModalityRepositoryMemory implements Partial<IModalityRepositoryDbMethods> {
  async save (modality: Modality) {
    return Promise.resolve().then(() => {
      modality.id = Math.floor(Math.random() * 1000)
      modalityList.push(modality)
      return modalityList
    }).catch((err) => {
      return err
    })
  }

  async findOne (id: number) {
    return Promise.resolve().then(() => {
      return modalityList.find((pi) => pi.id === id)
    }).catch((err) => {
      return err
    })
  }

  async delete (id: number) {
    return Promise.resolve().then(() => {
      const thisModality = modalityList.find((pi) => pi.id === id)
      const result = modalityList.splice(thisModality.id, 1)
      return result
    }).catch((err) => {
      return err
    })
  }

  async createMany (modality: Modality[]) {
    return Promise.resolve().then(() => {
      return [...modalityList, modality]
    }).catch((err) => {
      return err
    })
  }

  async find (filter?: object) {
    return Promise.resolve().then(() => {
      return modalityList
    }).catch((err) => {
      return err
    })
  }
}
