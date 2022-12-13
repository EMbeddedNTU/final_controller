import { FunctionState } from './function_state';

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
  id: number;
  name: string;
  location: AgentLocation;
  functionStateList: FunctionState[];
}

export class gestureInput {
  agentId: number;
  gesture: string;
}
