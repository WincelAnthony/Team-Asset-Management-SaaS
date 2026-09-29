import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('health/live')
  live() {
    return { status: 'ok' };
  }

  @Get('health/ready')
  ready() {
    // Dependency checks are added with database and queue clients.
    return { status: 'ok' };
  }
}
