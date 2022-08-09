export interface Health {
  message: string;
  uptime: Date;
}

export class HealthService {
  async getStatusHealth(): Promise<Health> {
    return { message: "api-gateway is running", uptime: new Date() };
  }
}
