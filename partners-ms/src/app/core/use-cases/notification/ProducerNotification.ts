import { Kafka } from "kafkajs"
import { randomUUID } from "crypto"

export class ProducerNotification {
    private kafka: Kafka;
    constructor (kafka: Kafka) {
      this.kafka = kafka
    }

    async execute (message: string, topic: string) {
      const producer = this.kafka.producer()
      await producer.connect()
      await producer.send({
        topic: topic,
        messages: [{ value: message, key: randomUUID() }]
      })
      await producer.disconnect()
    }
}
