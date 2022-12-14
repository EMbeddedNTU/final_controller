import { Injectable } from '@nestjs/common';
import { FunctionState } from './function_state';
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

    createLightStateCommand(f_state: ((f_state: LightState)=>LightState)): StateCommand {
        return this.createStateCommand<LightState>(f_state)
    }

    createLockStateCommand(f_state: ((f_state: LockState)=>LockState)): StateCommand {
        return this.createStateCommand<LockState>(f_state)
    }

    private createStateCommand<StateType extends FunctionState>(f_state: ((f_state: StateType)=>StateType)): StateCommand {
        StateCommandFactory.id++
        return new StateCommand(StateCommandFactory.id, f_state)
    }
}