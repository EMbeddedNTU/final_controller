import { Injectable } from '@nestjs/common';
import { FunctionType } from './function_state';
import { LightState, LightStateEnum } from './light_state';
import { LockState, LockStateEnum } from './lock_state';

import { StateCommand } from './state_command';
import { StateCommandFactory } from './state_command_factory';

@Injectable()
export class StateCommandService {
    static stateCommandList: StateCommand[] = [];

    constructor(private readonly stateCmdFactory: StateCommandFactory) {
        if (StateCommandService.stateCommandList.length == 0) {
            this.initStateCommand(stateCmdFactory);
        }
    }

    addLightStateCommand(
        name: string,
        fState: (fState: LightState) => LightState,
    ) {
        const stateCmd: StateCommand =
            this.stateCmdFactory.createStateCommand<LightState>(
                name,
                FunctionType.light,
                fState,
            );
        StateCommandService.stateCommandList.push(stateCmd);
    }

    addLockStateCommand(
        name: string,
        fState: (fState: LockState) => LockState,
    ) {
        const stateCmd: StateCommand =
            this.stateCmdFactory.createStateCommand<LockState>(
                name,
                FunctionType.lock,
                fState,
            );
        StateCommandService.stateCommandList.push(stateCmd);
    }

    getCommandById(id: number): StateCommand | null {
        if (id >= StateCommandService.stateCommandList.length)
            console.error('Command list index out of bound error');
        return StateCommandService.stateCommandList[id];
    }

    initStateCommand(factory: StateCommandFactory) {
        this.addLightStateCommand('把燈亮度調高', (state) => {
            if (state.lightState != LightStateEnum.PERCENT100) {
                state.lightState += 1;
            }
            return state;
        });

        this.addLightStateCommand('把燈亮度調低', (state) => {
            if (state.lightState != LightStateEnum.PERCENT0) {
                state.lightState -= 1;
            }
            return state;
        });

        this.addLockStateCommand('把門鎖開啟', (state) => {
            state.lockState = LockStateEnum.UNLOCKED;
            return state;
        });

        this.addLockStateCommand('把門鎖鎖上', (state) => {
            state.lockState = LockStateEnum.LOCKED;
            return state;
        });
    }
}
