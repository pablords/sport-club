import "reflect-metadata"
import { DataSource } from "typeorm"
import { ModalityModel } from "../models/ModalityModel"
import { PartnerModel } from "../models/PartnerModel"
import { ContractModel } from "../models/ContractModel"
import { ContactModel } from "../models/ContactModel"
import { runFactory } from "./factorys"
import "dotenv/config"
import { sleep } from "@/app/utils/sleep"
import { logger } from "../logger/config"

declare type LoggerOptions = boolean | "all" | Array<("query" | "schema" | "error" | "warn" | "info" | "log" | "migration")>;

export const connection = new DataSource({
  type: process.env.DB_ENGINE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ModalityModel,
    PartnerModel,
    ContactModel,
    ContractModel
  ],
  synchronize: true,
  logging: process.env.DB_LOGGING as LoggerOptions,
  timezone: process.env.TIMEZONE,
  connectTimeout: 10000
})

export const migrateDatabase = async (connection: DataSource) => {
  await sleep(400)
  const migrations = await connection.runMigrations()
  await sleep(400)
  return migrations
}

connection.initialize().then(async (conn) => {
  await Promise.all([
    await migrateDatabase(conn),
    await runFactory(conn)
  ])
}).catch((error) => {
  if (process.env.NODE_ENV === "development") {
    logger.error(error)
  }
})

export const entityManager = connection.manager
