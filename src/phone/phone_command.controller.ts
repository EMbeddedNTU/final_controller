import { Body, Controller, Post } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { MakeCommandInput } from './phone';

@Controller('phone/command')
export class PhoneCommandController {
    constructor(private readonly agentService: AgentService) {}

    @Post('makeCommand')
    makeCommand(@Body() body: MakeCommandInput): boolean {
        return this.agentService.makeCommand(body);
    }
}
