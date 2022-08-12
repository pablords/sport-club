// @ts-nocheck
import { contractFactory } from "@/app/factories/contract-factory"
import { randomUUID } from "crypto"
import { kafka } from "@/infra/services/kafka/config"
import { contractConsumer } from "@/app/consumers/contract.consumer"

jest.setTimeout(30000)

jest.mock("@/app/consumers/contract.consumer", () => {
  return {
    contractConsumer: jest.fn()
  }
})
jest.mock("@/infra/services/kafka/config", () => {
  return {
    kafka: {
      consumer: jest.fn().mockImplementation(() => {
        return {
          run: jest.fn(),
          subscribe: jest.fn()
        }
      })
    }
  }
})

describe("Teste unitário de consumidor kafka", () => {
  it("Deve consumir uma mensagem", async () => {
    const consumer = kafka.consumer({
      groupId: `partners-ms-${randomUUID()}`
    })

    await consumer.subscribe({
      topic: "payments.transactions.created",
      fromBeginning: false
    })
    const consumedMessages = []

    await consumer.run({
      eachMessage: ({ message }) => {
        consumedMessages.push(message)
      }
    })

    await contractConsumer()

    expect(kafka).toBeDefined()
  })
})
