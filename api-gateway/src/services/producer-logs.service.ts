import { LoggerMiddlewareDtoCreate } from "@/middlewares/logger";
import { kafka } from "../config/kafka";
import { ProducerKafka } from "./producer-kafka.service";

const producer = new ProducerKafka(kafka)

class ProducerLogsService {
  public async produce(data: LoggerMiddlewareDtoCreate) {
    await producer.execute(JSON.stringify(data), "api.gateway.logs")
  }
}

export default new ProducerLogsService();
