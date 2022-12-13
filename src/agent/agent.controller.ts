import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Agent, gestureInput } from './agent';
import { AgentService } from './agent.service';
import { FunctionState } from './function_state';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('register')
  registerAgent(@Body() body: Agent): boolean {
    return this.agentService.registerAgent(body);
  }

  @Post('gesture')
  gesture(@Body() body: gestureInput): boolean {
    return this.agentService.gesture(body);
  }

  @Get('/:id')
  getStatus(@Param('id') id: number): FunctionState[] {
    return this.agentService.getStatus(id);
  }
}
