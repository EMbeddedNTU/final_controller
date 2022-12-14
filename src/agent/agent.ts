import { GestureType } from 'src/config/gesture_config';
import { FunctionState } from '../state/function_state';

export enum AgentLocation {
  attic,
  bathroom,
  basement,
  bedroom,
  hall,
  kitchen,
  porch,
  dining_room,
  living_room,
  other,
}

export class Agent {
  constructor(
    id: number,
    name: string,
    functionStateList: FunctionState[],
    location: AgentLocation,
  ) {
    this.id = id;
    this.name = name;
    this.functionStateList = functionStateList;
    this.location = location;
  }
  id: number;
  name: string;
  location: AgentLocation;
  functionStateList: FunctionState[];
}

export class gestureInput {
  agentId: number;
  gesture: GestureType;
}
