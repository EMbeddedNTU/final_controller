import { Injectable } from '@nestjs/common';
import { LightState } from './light_state';
import { StateCommand } from './state_command';
import { StateCommandFactory } from './state_command_factory';

// const turnOnLight = new StateCommand(
//     0, (state)=>{return state;}
// )

@Injectable()
export class StateCommandService {
  static state_command_list: StateCommand[];

  constructor(private readonly stateCmdFactory: StateCommandFactory) {
    StateCommandService.state_command_list = [];
    this.initStateCommand(stateCmdFactory);
  }

  initStateCommand(factory: StateCommandFactory) {
    StateCommandService.state_command_list.push(
      factory.createLightStateCommand((state) => {
        return state;
      }),
    );
  }
}
