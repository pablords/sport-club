import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: ["kafka:29092"]
})