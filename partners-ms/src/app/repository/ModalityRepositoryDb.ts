import { Modality } from "@/app/core/entity"
import { entityManager } from "@/infra/db/config"
import { ModalityModel } from "@/infra/models/ModalityModel"
import { Repository } from "typeorm"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IModalityRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Modality>> {
  createMany(modality: Modality[]): Promise<Modality[]>
}
export class ModalityRepositoryDb implements IModalityRepositoryDbMethods {
  constructor (private repository: Repository<ModalityModel>) {
    this.repository = repository
  }

  async createMany (modality: Modality[]) {
    return await this.repository.save(modality)
  }

  async find () {
    return await this.repository.find()
  }

  async findOne (id: number) {
    return await this.repository.findOne({ where: { id: id } })
  }

  async delete (id: number) {
    return await this.repository.delete(id)
  }

  async update (id: number, modality: Modality) {
    return await this.repository.update(id, modality)
  }
}
