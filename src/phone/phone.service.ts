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
    StateCommandOption,
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
        return this.configService
            .readGestureConfig()
            .gestureSettings.map((e) => {
                let transformedGestureSetting = new TransformedGestureSetting();
                transformedGestureSetting.gestureType = e.gestureType;
                transformedGestureSetting.effectType = e.effectType;
                transformedGestureSetting.agentTriggerName =
                    e.agentTrigger?.name;
                transformedGestureSetting.stateCommandName =
                    e.effects[0].command.name;
                return transformedGestureSetting;
            });
    }

    getGestureOption(): GestureSettingOption {
        let agentNameList = this.configService
            .readAgentConfig()
            .agents.flatMap((e) => e.name);

        return {
            gestureTypeList: GestureTypeList,
            effectTypeList: EffectTypeList,
            agentNameList: agentNameList,
        };
    }

    getStateCommandOption(): StateCommandOption[] {
        // TODO:
        let stateCommandOptionList: StateCommandOption[] =
            StateCommandService.stateCommandList.flatMap((e) => {
                let option = new StateCommandOption();
                option.id = e.id;
                option.name = e.name;
                return option;
            });
        return stateCommandOptionList;
    }
}
