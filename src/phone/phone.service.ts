import { Injectable } from '@nestjs/common';
import { AgentInfo } from 'src/agent/agent';
import { AgentService } from 'src/agent/agent.service';
import { ConfigService } from 'src/config/config.service';
import { StateCommandService } from 'src/state/state_command_service';
import {
    EffectTypeList,
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
                const transformedGestureSetting =
                    new TransformedGestureSetting();
                transformedGestureSetting.gestureType = e.gestureType;
                transformedGestureSetting.effectType = e.effectType;
                transformedGestureSetting.agentTriggerName =
                    e.agentTrigger?.name;
                transformedGestureSetting.agentTargetName = e.agentTarget?.name;
                transformedGestureSetting.stateCommandName =
                    e.effects[0].command.name;
                return transformedGestureSetting;
            });
    }

    getGestureOption(): GestureSettingOption {
        const agentInfoList: AgentInfo[] =
            this.configService.readAgentConfig().agents;

        return {
            gestureTypeList: GestureTypeList,
            effectTypeList: EffectTypeList,
            agentInfoList: agentInfoList,
        };
    }

    getStateCommandOption(agentId: number): StateCommandOption[] {
        const agentConfig = this.configService.readAgentConfig();
        const targetAgent = this.agentService.getAgentById(
            agentConfig,
            agentId,
        );

        const functionTypes = targetAgent.functionStateList.flatMap(
            (e) => e.type,
        );
        
        let stateCommandOptionList = this.getAllStateCommandOption();
        stateCommandOptionList = stateCommandOptionList.filter((e) => {
            const stateCommand = this.stateCommandService.getCommandById(e.id);
            if (functionTypes.includes(stateCommand.stateType)) {
                return true;
            }
            return false;
        });

        return stateCommandOptionList;
    }

    getAllStateCommandOption(): StateCommandOption[] {
        const stateCommandOptionList: StateCommandOption[] =
            StateCommandService.stateCommandList.flatMap((e) => {
                const option = new StateCommandOption();
                option.id = e.id;
                option.name = e.name;
                return option;
            });
        return stateCommandOptionList;
    }
}
