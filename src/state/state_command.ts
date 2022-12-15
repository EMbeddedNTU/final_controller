import { FunctionState, FunctionType } from './function_state';

export type StateCommandFunc = (fState: FunctionState) => FunctionState;

export class StateCommand {
  constructor(
    id: number,
    name: string,
    stateType: FunctionType,
    stateFunction: StateCommandFunc,
  ) {
    this.id = id;
    this.name = name;
    this.stateType = stateType;
    this.stateFunction = stateFunction;
  }

  id: number;

  name: string;

  stateType: FunctionType;

  stateFunction: StateCommandFunc;
}
