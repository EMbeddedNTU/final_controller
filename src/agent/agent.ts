import { GestureType } from 'src/config/gesture_config';
import { FunctionState } from '../state/function_state';

export class Agent {
  constructor(
    id: number,
    name: string,
    functionStateList: FunctionState[],
    location: string,
  ) {
    this.id = id;
    this.name = name;
    this.functionStateList = functionStateList;
    this.location = location;
  }
  id: number;
  name: string;
  location: string;
  functionStateList: FunctionState[];
}

export class GestureInput {
  agentId: number;
  gesture: GestureType;
}
