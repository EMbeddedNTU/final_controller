import { FunctionState } from "./function_state";

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
    other
}


export class Agent {
    id: number;

    name: string;

    functions: FunctionState[];

    function_state: any;

    location: AgentLocation;
}
