import { Expose } from "class-transformer";
import { FunctionState } from "./function_state";

export type StateCommandFunc = (f_state: FunctionState)=>FunctionState

export class StateCommand {

    constructor(
        id: number,
        state_function: StateCommandFunc
    ) {
        this.id = id;
        this.state_function = state_function;
    }

    id: number;

    state_function: StateCommandFunc;
}