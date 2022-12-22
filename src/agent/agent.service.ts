import { Injectable } from '@nestjs/common';
import { AgentConfig } from 'src/config/agent_config';
import { ConfigService } from 'src/config/config.service';
import { EffectType } from 'src/config/gesture_config';
import { ChangeAgentProfileInput, MakeCommandInput } from 'src/phone/phone';
import { FunctionState, FunctionType } from 'src/state/function_state';
import { LightState } from 'src/state/light_state';
import { LockState } from 'src/state/lock_state';
import { StateCommandService } from 'src/state/state_command_service';
import { Agent, AgentInfo, GestureInput } from './agent';

@Injectable()
export class AgentService {
    constructor(
        private readonly configService: ConfigService,
        private readonly stateCommandService: StateCommandService,
    ) {}

    registerAgent(body: Agent): boolean {
        const agentConfig = this.configService.readAgentConfig();
        const targetAgent = this.getAgentById(agentConfig, body.id);

        if (targetAgent == null) {
            agentConfig.agents.push(body);
        }

        this.configService.saveAgentConfig(agentConfig);

        return true;
    }

    replaceAgentProfile(
        targetAgent: Agent,
        name: string | null,
        location: string | null,
    ) {
        targetAgent.name = name != null ? name : targetAgent.name;
        targetAgent.location =
            location != null ? location : targetAgent.location;
    }

    getAgentProfiles(): AgentInfo[] {
        const agentInfoList: AgentInfo[] =
            this.configService.readAgentConfig().agents;
        return agentInfoList;
    }

    changeAgentProfile(body: ChangeAgentProfileInput): boolean {
        const agentConfig = this.configService.readAgentConfig();
        const gestureConfig = this.configService.readGestureConfig();

        const targetAgent = this.getAgentById(agentConfig, body.id);

        if (targetAgent == null) {
            return false;
        } else {
            this.replaceAgentProfile(targetAgent, body.name, body.location);
        }

        gestureConfig.gestureSettings.forEach((e) => {
            if (e.agentTarget?.id == body.id) {
                this.replaceAgentProfile(
                    e.agentTarget,
                    body.name,
                    body.location,
                );
            }
            e.effects.forEach((effect) => {
                if (effect.agent?.id == body.id) {
                    this.replaceAgentProfile(
                        effect.agent,
                        body.name,
                        body.location,
                    );
                }
            });
        });

        this.configService.saveAgentConfig(agentConfig);
        this.configService.saveGestureConfig(gestureConfig);
        return true;
    }

    makeGesture(body: GestureInput): boolean {
        const gestureConfig = this.configService.readGestureConfig();
        const agentConfig = this.configService.readAgentConfig();

        let targetAgentId = body.agentId;
        const targetGestureSetting = gestureConfig.gestureSettings.find(
            (e) => e.gestureType == body.gestureType,
        );
        if (targetGestureSetting == undefined) {
            return false;
        }
        if (targetGestureSetting.effectType == EffectType.global) {
            targetAgentId = targetGestureSetting.agentTarget!.id;
        }

        const targetAgent = this.getAgentById(agentConfig, targetAgentId);

        if (targetAgent == null) {
            return false;
        } else {
            const targetFunctionState = targetAgent.functionStateList.find(
                (functionState: FunctionState) =>
                    functionState.type ==
                    targetGestureSetting.effects[0].command.stateType,
            );

            const transferFunc = this.stateCommandService.getCommandById(
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

    getStates(id: number): string {
        const agentConfig = this.configService.readAgentConfig();
        const targetAgent = this.getAgentById(agentConfig, id);
        if (targetAgent == null) {
            return '';
        } else {
            let result: string = '';
            for (const functionState of targetAgent.functionStateList) {
                if (functionState.type == FunctionType.light) {
                    const lightState = functionState as LightState;
                    result = result + lightState.type + lightState.lightState;
                } else if (functionState.type == FunctionType.lock) {
                    const lockState = functionState as LockState;
                    result = result + lockState.type + lockState.lockState;
                }
            }
            return result;
        }
    }

    getAgentById(agentConfig: AgentConfig, id: number): Agent | null {
        const targetAgent: Agent = agentConfig.agents.find(
            (agent: Agent) => agent.id == id,
        );
        if (targetAgent == undefined) {
            return null;
        }

        return targetAgent;
    }

    makeCommand(body: MakeCommandInput): boolean {
        const agentConfig = this.configService.readAgentConfig();
        const targetAgent = this.getAgentById(agentConfig, body.agentId);
        const stateCommand = this.stateCommandService.getCommandById(
            body.stateCommandId,
        );

        let targetState = targetAgent.functionStateList.find(
            (e) => e.type == stateCommand.stateType,
        );
        targetState = stateCommand.stateFunction(targetState);

        this.configService.saveAgentConfig(agentConfig);
        return true;
    }
}
