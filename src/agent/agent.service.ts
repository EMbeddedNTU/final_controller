import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { EffectType } from 'src/config/gesture_config';
import { FunctionState, FunctionType } from 'src/state/function_state';
import { LightState } from 'src/state/light_state';
import { LockState } from 'src/state/lock_state';
import { StateCommandService } from 'src/state/state_command_service';
import { Agent, gestureInput } from './agent';

@Injectable()
export class AgentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly stateCommandService: StateCommandService,
  ) {}

  registerAgent(body: Agent): boolean {
    let agentConfig = this.configService.readAgentConfig();
    let targetAgent: Agent = agentConfig.agents.find(
      (agent: Agent) => agent.id == body.id,
    );

    if (targetAgent == undefined) {
      agentConfig.agents.push(body);
    }

    this.configService.saveAgentConfig(agentConfig);

    return true;
  }

  gesture(body: gestureInput): boolean {
    let gestureConfig = this.configService.readGestureConfig();
    let agentConfig = this.configService.readAgentConfig();

    let targetAgentId = body.agentId;
    let targetGestureSetting = gestureConfig.gestureSettings.find(
      (e) => e.gestureType == body.gesture,
    );
    if (targetGestureSetting == undefined) {
      return;
    }
    if (targetGestureSetting.effectType == EffectType.specific) {
      targetAgentId = targetGestureSetting.agentTrigger!.id;
    }

    let targetAgent: Agent = agentConfig.agents.find(
      (agent: Agent) => agent.id == targetAgentId,
    );

    if (targetAgent == undefined) {
      return false;
    } else {
      let targetFunctionState = targetAgent.functionStateList.find(
        (functionState: FunctionState) =>
          functionState.type ==
          targetGestureSetting.effects[0].command.stateType,
      );

      let transferFunc = this.stateCommandService.getCommandById(
        targetGestureSetting.effects[0].command.id,
      ).stateFunction;

      let targetState;
      if (targetFunctionState.type == FunctionType.light) {
        targetState = targetFunctionState as LightState;
      } else if (targetFunctionState.type == FunctionType.lock) {
        targetState = targetFunctionState as LockState;
      }

      targetState = transferFunc(targetState);

      this.configService.saveAgentConfig(agentConfig);
      return true;
    }
  }

  getStatus(id: number): FunctionState[] {
    let agentConfig = this.configService.readAgentConfig();
    let targetAgent: Agent = agentConfig.agents.find(
      (agent: Agent) => agent.id == id,
    );
    if (targetAgent == undefined) {
      return;
    } else {
      return targetAgent.functionStateList;
    }
  }
}
