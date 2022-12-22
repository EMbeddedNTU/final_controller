import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgentInfo } from 'src/agent/agent';
import { AgentService } from 'src/agent/agent.service';
import { ChangeAgentProfileInput } from './phone';

@Controller('phone/agentSetting')
export class PhoneAgentSettingController {
    constructor(private readonly agentService: AgentService) {}

    @Get('agentProfiles')
    getAgentProfiles(): AgentInfo[] {
        return this.agentService.getAgentProfiles();
    }

    @Post('changeAgentProfile')
    changeAgentProfile(@Body() body: ChangeAgentProfileInput): boolean {
        console.log(body);
        return this.agentService.changeAgentProfile(body);
    }
}
