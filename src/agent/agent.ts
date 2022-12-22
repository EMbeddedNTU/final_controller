import { GestureType } from 'src/config/gesture_config';
import { FunctionState } from '../state/function_state';

export class AgentInfo {
  constructor(
    id: number,
    name: string,
    location: string,
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
  }
  id: number;
  name: string;
  location: string;
}

export class Agent extends AgentInfo{
  constructor(
    id: number,
    name: string,
    functionStateList: FunctionState[],
    location: string,
  ) {
    super(id, name, location)
    this.functionStateList = functionStateList;
  }
  functionStateList: FunctionState[];
}

export class GestureInput {
  agentId: number;
  gestureType: GestureType;
}
