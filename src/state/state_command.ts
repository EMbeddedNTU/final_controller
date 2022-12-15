import { Expose } from "class-transformer";
import { FunctionState, FunctionType } from "./function_state";

export type StateCommandFunc = (f_state: FunctionState)=>FunctionState

export class StateCommand {

    constructor(
        id: number,
        name: string,
        state_type: FunctionType,
        state_function: StateCommandFunc
    ) {
        this.id = id;
        this.name = name;
        this.state_type = state_type;
        this.state_function = state_function;
    }

    id: number;

    name: string;

    state_type: FunctionType;

    state_function: StateCommandFunc;
}