import { GestureType } from 'src/config/gesture_config';
import { FunctionState } from '../state/function_state';

const TypeList = ['控制燈光', '控制鎖'];

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
            functionStateList.flatMap((e) => TypeList[e.type]),
        );
        this.functionStateList = functionStateList;
    }
    functionStateList: FunctionState[];
}

export class GestureInput {
    agentId: number;
    gestureType: GestureType;
}
