import { FunctionState, FunctionType } from './function_state';

export enum LightStateEnum {
  OFF,
  ON,
}

export class LightState implements FunctionState {
  type: FunctionType;
  light_state: LightStateEnum;
}
