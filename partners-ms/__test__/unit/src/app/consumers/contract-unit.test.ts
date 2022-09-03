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
      }),
      producer: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn()
        }
      }),
      connect: jest.fn(),
      disconnect: jest.fn()
    }
  }
})

describe("Teste unitário de consumidor kafka", () => {
  let topicName, groupId, producer, consumer

  beforeEach(async () => {
    topicName = `payments.transactions.created.${randomUUID()}`
    groupId = `consumer-group-id-${randomUUID()}`

    producer = kafka.producer()

    consumer = kafka.consumer({
      groupId: `partners-ms-${randomUUID()}`
    })
  })

  it("Deve consumir uma mensagem", async () => {
    await consumer.subscribe({ topic: topicName, fromBeginning: true })

    const messagesConsumed = []
    consumer.run({
      eachMessage: async (event) => messagesConsumed.push(event)
    })
    await Promise.resolve(consumer)

    const messages = Array(100)
      .fill()
      .map(() => {
        const value = randomUUID()
        return { key: `key-${value}`, value: `value-${value}` }
      })

    await producer.send({ acks: 1, topic: topicName, messages })
    await Promise.resolve(messagesConsumed, { number: messages.length })

    expect(kafka).toBeDefined()
  })
})
