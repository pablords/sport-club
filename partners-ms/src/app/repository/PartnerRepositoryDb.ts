import { Partner } from "@/app/core/entity"
import { PartnerModel } from "@/infra/models/PartnerModel"
import { Repository } from "typeorm"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IPartnerRepositoryDbMethods
    extends Partial<IRepositoryDbMethodsBase<Partner>> {
    findEmail(partner: Partner): Promise<Partner>;
    findRelationsOne(
        id: number,
        relations: Array<"contacts" | "modalities" | "contracts">
    ): Promise<Partner>;
}

export class PartnerRepositoryDb implements IPartnerRepositoryDbMethods {
  constructor (private repository: Repository<PartnerModel>) {
    this.repository = repository
  }

  async create (partner: Partner) {
    return await this.repository.save(partner)
  }

  async findAll () {
    return await this.repository.find()
  }

  async find () {
    return await this.repository.find()
  }

  async findOne (id: number) {
    return await this.repository.findOne({ where: { id: id } })
  }

  async update (id: number, partner: Partner) {
    return await this.repository.update(id, partner)
  }

  async findEmail (partner: Partner) {
    return await this.repository.findOne({
      where: { id: partner.id },
      relations: ["contacts"]
    })
  }

  async delete (id: number) {
    return await this.repository.delete(id)
  }

  async findRelationsOne (
    id: number,
    relations: Array<"contacts" | "modalities" | "contracts">
  ) {
    return await this.repository.findOne({
      where: { id: id },
      relations: relations
    })
  }
}
