import { FunctionState, FunctionType } from './function_state';

export enum LockStateEnum {
  LOCKED,
  UNLOCKED,
}

export class LockState implements FunctionState {
  type: FunctionType;
  lockState: LockStateEnum;
}
