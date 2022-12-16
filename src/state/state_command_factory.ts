import { Injectable } from '@nestjs/common';
import { FunctionState, FunctionType } from './function_state';
import { StateCommand } from './state_command';

@Injectable()
export class StateCommandFactory {
  static id: number;

  constructor() {
    StateCommandFactory.id = -1;
  }

  createStateCommand<StateType extends FunctionState>(
    name: string,
    stateType: FunctionType,
    fState: (fState: StateType) => StateType,
  ): StateCommand {
    StateCommandFactory.id += 1;
    return new StateCommand(StateCommandFactory.id, name, stateType, fState);
  }
}
