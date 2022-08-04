import { randomUUID } from "crypto"
import { kafka } from "@/infra/services/kafka/config"
import { contractFactory } from "@/app/factories/contract-factory"

const factory = contractFactory()

export async function contractConsumer () {
  const consumer = kafka.consumer({ groupId: `partners-ms-${randomUUID()}` })
  await consumer.subscribe({
    topic: "payments.transactions.created",
    fromBeginning: false
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      const data = {
        key: message.key.toString(),
        value: message.value.toString()
      }
      const dataParse: any = JSON.parse(data.value)
      await factory.updateContractStatus.execute(dataParse.contractId, dataParse.status)
    }
  })
}
