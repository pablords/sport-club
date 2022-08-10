import { Worker } from "worker_threads"
import path from "path"
import { logger } from "@/infra/logger/config"

export async function createWorkerContractConsumer () {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.resolve("src/app/consumers/contract.consumer.js")
    )
    logger.info(`Executando worker for id: ${worker.threadId}`)
    worker.on("message", resolve)
    worker.on("error", reject)
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}
