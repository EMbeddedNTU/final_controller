import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { ConfigService } from 'src/config/config.service';
import { EffectType, GestureSetting } from 'src/config/gesture_config';
import { StateCommandService } from 'src/state/state_command_service';
import { AddGestureInput, DeleteGestureInput } from './gesture_request_type';

@Injectable()
export class GestureService {
  constructor(
    private readonly configService: ConfigService,
    private readonly agentService: AgentService,
    private readonly stateCommandService: StateCommandService,
  ) {}


    deleteGesture(input: DeleteGestureInput): boolean {
        const gestureConfig = this.configService.readGestureConfig();
        
        gestureConfig.gestureSettings = gestureConfig.gestureSettings.filter((setting) =>
            setting.gestureType != input.gestureType ||
            setting.effectType != input.effectType 
            // ||
            // setting.agentTrigger?.id != input.triggerAgentId,
        );

        this.configService.saveGestureConfig(gestureConfig);
        return true;
    }

    addGesture(input: AddGestureInput): boolean {
        const gestureConfig = this.configService.readGestureConfig();
        const agentConfig = this.configService.readAgentConfig();

        // if(input.effectType == EffectType.specific && input.triggerAgentId == null) {
        //     throw new HttpException("please provide a trigger agent", HttpStatus.BAD_REQUEST)
        // }

        const triggerAgent =
        input.triggerAgentId != null
            ? this.agentService.getAgentById(agentConfig, input.triggerAgentId)
            : null;

            const targetAgent =
            input.targetAgentId != null
                ? this.agentService.getAgentById(agentConfig, input.targetAgentId)
                : null;
        
        const stateCommand = this.stateCommandService.getCommandById(input.stateCommandId);
        const stateCommandAgent = this.agentService.getAgentById(agentConfig, input.stateCommandAgentId)

        const newGestureSetting = new GestureSetting(
            input.gestureType,
            input.effectType,
            [{ command: stateCommand, agent: stateCommandAgent }],
            targetAgent,
            triggerAgent,
        );

        gestureConfig.gestureSettings.push(newGestureSetting);
        this.configService.saveGestureConfig(gestureConfig);

        return true;
    }
}
