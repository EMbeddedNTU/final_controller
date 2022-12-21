import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { GestureService } from 'src/gesture/gesture.service';
import { AddGestureInput, DeleteGestureInput } from 'src/gesture/gesture_request_type';
import { StateCommand } from 'src/state/state_command';
import {
  ChangeAgentProfileInput,
  GestureSettingOption,
  StateCommandOption,
  TransformedGestureSetting,
} from './phone';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(
    private readonly phoneService: PhoneService,
    private readonly agentService: AgentService,
    private readonly gestureService: GestureService,
  ) {}

  @Get('gestureList')
  getGestureList(): TransformedGestureSetting[] {
    return this.phoneService.getGestureList();
  }

  @Get('gestureSettingOption')
  getGestureOption(): GestureSettingOption {
    return this.phoneService.getGestureOption();
  }

  @Get('stateCommandOption')
  getStateCommandOption(): StateCommandOption[] {
    return this.phoneService.getStateCommandOption();
  }

  @Post('addGesture')
  addGesture(@Body() body: AddGestureInput): boolean {
    return this.gestureService.addGesture(body);
  }

  @Post('deleteGesture')
  deleteGesture(@Body() body: DeleteGestureInput): boolean {
    return this.gestureService.deleteGesture(body);
  }

  @Post('changeAgentProfile')
  changeAgentProfile(@Body() body: ChangeAgentProfileInput): boolean {
    return this.agentService.changeAgentProfile(body);
  }
}
