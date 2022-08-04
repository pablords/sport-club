
// @ts-nocheck

import { ProducerNotification } from "@/app/core/use-cases/notification/ProducerNotification"
import { kafka } from "@/infra/services/kafka/config"
import { Kafka, Producer } from "kafkajs"

jest.setTimeout(30000)
jest.mock("@/infra/services/kafka/config")

const KafkaMock = Kafka as jest.Mock<Kafka>
const kafkaMock = KafkaMock as jest.Mocked<Kafka>

describe("Testes unitários de notificacoes", () => {
  it("Deve injetar uma instancia do kafka", async () => {
    const producerNotification = new ProducerNotification(kafka)
    const spy = jest.spyOn(producerNotification, "execute")
    // jest.spyOn(kafkaMock, "producer").mockReturnThis()
    producerNotification.execute("message", "topic")
    expect(producerNotification).toBeDefined()
    expect(spy).toHaveBeenCalled()
  })
})
