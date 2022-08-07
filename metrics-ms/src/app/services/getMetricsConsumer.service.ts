import { kafka } from "../../infra/config/kafka";
import { processDataStream } from "./processDataStream.service";

export async function getMetricsConsumerService(
  groupId: string,
  topic: string
) {
  const consumer = kafka.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processDataStream(message.value.toString());
    },
  });
}
