import { FunctionState, FunctionType } from './function_state';

export enum LightStateEnum {
    PERCENT0,
    PERCENT25,
    PERCENT50,
    PERCENT75,
    PERCENT100,
}

export class LightState implements FunctionState {
    type: FunctionType;
    lightState: LightStateEnum;
}
