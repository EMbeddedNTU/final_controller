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

export enum AgentFunction {
    light,
    lock,
}

export class Agent {
    id: number;

    name: string;

    functions: AgentFunction[];

    function_state: any;

    location: AgentLocation;
}
