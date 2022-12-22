import { GestureType } from 'src/config/gesture_config';
import { LightState } from 'src/state/light_state';
import { LockState } from 'src/state/lock_state';
import { FunctionState, FunctionType } from '../state/function_state';

const TypeList = ['燈光', '門鎖'];
const StateList = [
    ['全暗', '25%亮度', '50%亮度', '75%亮度', '全亮'],
    ['上鎖', '開啟'],
];

export class AgentInfo {
    constructor(
        id: number,
        name: string,
        location: string,
        typeList: string[],
    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.typeList = typeList;
    }
    id: number;
    name: string;
    location: string;
    typeList: string[];
}

export class Agent extends AgentInfo {
    constructor(
        id: number,
        name: string,
        location: string,
        functionStateList: FunctionState[],
    ) {
        super(
            id,
            name,
            location,
            functionStateList.flatMap((e) => {
                let stateString: string;
                if (e.type == FunctionType.light) {
                    stateString =
                        StateList[e.type][(e as LightState).lightState];
                }
                if (e.type == FunctionType.lock) {
                    stateString = StateList[e.type][(e as LockState).lockState];
                }
                return TypeList[e.type] + ' ： ' + stateString;
            }),
        );
        this.functionStateList = functionStateList;
    }
    functionStateList: FunctionState[];
}

export class GestureInput {
    agentId: number;
    gestureType: GestureType;
}
