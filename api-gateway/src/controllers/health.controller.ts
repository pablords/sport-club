
import { Get, Route } from "tsoa";
import { HealthService, Health } from "../services/health.service";

const healthService = new HealthService()

@Route("health")
export class HealthController {
  @Get("/")
  public async getStatusHealth(): Promise<Health> {
   return healthService.getStatusHealth()
  }
}
