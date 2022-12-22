import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    makeGesture(@Body() body: GestureInput): boolean {
        return this.agentService.makeGesture(body);
    }

    @Get('/:id')
    getStates(@Param('id') id: number): string {
        return this.agentService.getStates(id);
    }
}
