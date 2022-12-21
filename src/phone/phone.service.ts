import { Injectable } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { ConfigService } from 'src/config/config.service';
import { GestureSetting } from 'src/config/gesture_config';
import { StateCommandService } from 'src/state/state_command_service';
import {
  EffectTypeList,
  GestureInput,
  GestureSettingOption,
  GestureTypeList,
  TransformedGestureSetting,
} from './phone';

@Injectable()
export class PhoneService {
  constructor(
    private readonly configService: ConfigService,
    private readonly agentService: AgentService,
    private readonly stateCommandService: StateCommandService,
  ) {}

  getGestureList(): TransformedGestureSetting[] {
    return this.configService.readGestureConfig().gestureSettings.map((e) => {
      let transformedGestureSetting = new TransformedGestureSetting();
      transformedGestureSetting.gestureType = e.gestureType;
      transformedGestureSetting.effectType = e.effectType;
      transformedGestureSetting.agentTriggerName = e.agentTrigger?.name;
      transformedGestureSetting.stateCommandName = e.effects[0].command.name;
      return transformedGestureSetting;
    });
  }

  getGestureOption(): GestureSettingOption {
    let agentNameList = this.configService
      .readAgentConfig()
      .agents.flatMap((e) => e.name);

    let stateCommandNameList = StateCommandService.stateCommandList.flatMap(
      (e) => e.name,
    );

    return {
      gestureTypeList: GestureTypeList,
      effectTypeList: EffectTypeList,
      agentNameList: agentNameList,
      stateCommandNameList: stateCommandNameList,
    };
  }

  // deleteGesture(body: GestureInput): boolean {
  //   let gestureConfig = this.configService.readGestureConfig();
  //   gestureConfig.gestureSettings = gestureConfig.gestureSettings.filter(
  //     (e) =>
  //       e.gestureType != body.gestureType || e.effectType != body.effectType,
  //   );
  //   this.configService.saveGestureConfig(gestureConfig);

  //   return true;
  // }

  // addGesture(body: GestureInput): boolean {
  //   let gestureConfig = this.configService.readGestureConfig();
  //   let agentConfig = this.configService.readAgentConfig();
  //   let agent =
  //     body.agentId != null
  //       ? this.agentService.getAgentById(agentConfig, body.agentId)
  //       : null;
  //   let stateCommand = this.stateCommandService.getCommandById(
  //     body.stateCommandId,
  //   );
  //   let newGestureSetting = new GestureSetting(
  //     body.gestureType,
  //     body.effectType,
  //     [{ command: stateCommand, agent: agent }],
  //     agent,
  //   );
  //   newGestureSetting.effects[0].command.stateFunction = null;

  //   gestureConfig.gestureSettings.push(newGestureSetting);
  //   this.configService.saveGestureConfig(gestureConfig);

  //   return true;
  // }
}
