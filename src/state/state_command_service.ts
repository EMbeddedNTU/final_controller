import { Injectable } from '@nestjs/common';
import { FunctionType } from './function_state';
import { LightState, LightStateEnum } from './light_state';
import { LockState } from './lock_state';

import { StateCommand } from './state_command';
import { StateCommandFactory } from './state_command_factory';

@Injectable()
export class StateCommandService {
  static stateCommandList: StateCommand[];

  constructor(private readonly stateCmdFactory: StateCommandFactory) {
    StateCommandService.stateCommandList = [];
    this.initStateCommand(stateCmdFactory);
  }

  addLightStateCommand(
    name: string,
    fState: (fState: LightState) => LightState,
  ) {
    let stateCmd: StateCommand =
      this.stateCmdFactory.createStateCommand<LightState>(
        name,
        FunctionType.light,
        fState,
      );
    StateCommandService.stateCommandList.push(stateCmd);
  }

  addLockStateCommand(name: string, fState: (fState: LockState) => LockState) {
    let stateCmd: StateCommand =
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
    this.addLightStateCommand('turn on light', (state) => {
      state.lightState = LightStateEnum.ON;
      return state;
    });

    this.addLightStateCommand('turn off light', (state) => {
      state.lightState = LightStateEnum.OFF;
      return state;
    });
  }
}
