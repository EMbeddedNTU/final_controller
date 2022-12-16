import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FunctionState } from 'src/state/function_state';
import { Agent, GestureInput } from './agent';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('register')
  registerAgent(@Body() body: Agent): boolean {
    return this.agentService.registerAgent(body);
  }

  @Post('gesture')
  gesture(@Body() body: GestureInput): boolean {
    return this.agentService.gesture(body);
  }

  @Get('/:id')
  getStatus(@Param('id') id: number): FunctionState[] {
    return this.agentService.getStatus(id);
  }
}
