import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import {
  ChangeAgentProfileInput,
  GestureInput,
  GestureSettingOption,
  TransformedGestureSetting,
} from './phone';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(
    private readonly phoneService: PhoneService,
    private readonly agentService: AgentService,
  ) {}

  @Post('add')
  addGesture(@Body() body: GestureInput): boolean {
    return this.phoneService.addGesture(body);
  }

  @Post('delete')
  deleteGesture(@Body() body: GestureInput): boolean {
    return this.phoneService.deleteGesture(body);
  }

  @Post('changeAgentProfile')
  changeAgentProfile(@Body() body: ChangeAgentProfileInput): boolean {
    return this.agentService.changeAgentProfile(body);
  }

  @Get('gestureList')
  getGestureList(): TransformedGestureSetting[] {
    return this.phoneService.getGestureList();
  }

  @Get('gestureOption')
  getGestureOption(): GestureSettingOption {
    return this.phoneService.getGestureOption();
  }
}
