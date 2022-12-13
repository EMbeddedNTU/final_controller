import { FunctionState } from "../state/function_state";

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
    
    constructor(
        id: number, 
        name: string,
        functions: FunctionState[],
        location: AgentLocation
    ) {
        this.id = id;
        this.name = name;
        this.functions = functions;
        this.location = location;
    }

    id: number;

    name: string;

    functions: FunctionState[];

    location: AgentLocation;
}
