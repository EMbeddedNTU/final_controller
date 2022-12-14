import { AgentInfo } from 'src/agent/agent';
import { EffectType, GestureType } from 'src/config/gesture_config';

export class GestureSettingOption {
    gestureTypeList: string[];

    effectTypeList: string[];

    agentInfoList: AgentInfo[];
}

export class StateCommandOption {
    id: number;

    name: string;
}

export class TransformedGestureSetting {
    gestureType: GestureType;

    effectType: EffectType;

    agentTargetName?: string | null;

    agentTriggerName?: string | null;

    stateCommandName: string;
}

export class ChangeAgentProfileInput {
    id: number;

    name?: string;

    location?: string;
}

export class MakeCommandInput {
    agentId: number;
    stateCommandId: number;
}

export const GestureTypeList: string[] = [
    '手往左移動',
    '手往右移動',
    '手往後移動',
    '手往前移動',
    '手往下移動',
    '手往上移動',
];

export const EffectTypeList: string[] = ['針對鄰近裝置', '針對特定裝置'];
