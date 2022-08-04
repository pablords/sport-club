import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getStatusCode(): string {
    return 'ok';
  }
}
