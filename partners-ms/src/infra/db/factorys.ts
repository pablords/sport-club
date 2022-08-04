import { Modality } from "@/app/core/entity"
import { DataSource } from "typeorm"
import { ModalityModel } from "../models/ModalityModel"

export const modalityFactory: Modality[] =
    [
      { name: "futebol", description: "esporte" },
      { name: "basquete", description: "esporte" },
      { name: "jiujitsu", description: "esporte" },
      { name: "karatê", description: "esporte" },
      { name: "natação", description: "esporte" }

    ]

export async function runFactory (connection: DataSource) {
  async function deleteTable () {
    // await connection.query(`DELETE FROM partners`)
    // await connection.query(`ALTER TABLE partners AUTO_INCREMENT = 1`)
    // await connection.query(`DELETE FROM modalities`)
    // await connection.query(`ALTER TABLE modalities AUTO_INCREMENT = 1`)
    // await connection.query(`DELETE FROM contacts`)
    // await connection.query(`ALTER TABLE contacts AUTO_INCREMENT = 1`)
    // await connection.query(`DELETE FROM contracts`)
    // await connection.query(`ALTER TABLE contracts AUTO_INCREMENT = 1`)
  }

  async function insertData () {
    await connection.createQueryBuilder()
      .insert()
      .into(ModalityModel)
      .values(modalityFactory)
      .execute()
  }

  const execute = async () => {
    await Promise.all([
      await deleteTable(),
      await insertData()
    ])
  }

  execute()
}
