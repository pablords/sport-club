import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: "partners-ms",
  brokers: ["kafka:29092"]
})
