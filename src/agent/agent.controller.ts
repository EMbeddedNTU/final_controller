import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('register')
  registerAgent(@Request() req): boolean {
    return this.agentService.registerAgent(req);
  }

  @Get('/:id')
  getStatus(@Param('id') id: number) {
    return this.agentService.getStatus(id);
  }
}
