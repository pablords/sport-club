import { Kafka } from "kafkajs"

const {KAFKA_BROKER, KAFKA_CLIENT_ID} = process.env

export const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER],
})