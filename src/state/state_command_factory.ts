import { Injectable } from '@nestjs/common';
import { FunctionState, FunctionType } from './function_state';
import { LightState } from './light_state';
import { LockState } from './lock_state';
import { StateCommand } from "./state_command";

@Injectable()
export class StateCommandFactory {
    
    static id: number;

    constructor(
    ) {
        StateCommandFactory.id = 0;
    }

    createStateCommand<StateType extends FunctionState>(name: string, state_type: FunctionType, f_state: ((f_state: StateType)=>StateType)): StateCommand {
        StateCommandFactory.id++
        return new StateCommand(StateCommandFactory.id, name, state_type, f_state)
    }
}