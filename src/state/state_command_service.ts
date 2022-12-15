import { Injectable } from '@nestjs/common';
import { FunctionType } from './function_state';
import { LightState, LightStateEnum } from './light_state';
import { LockState } from './lock_state';

import { StateCommand } from './state_command';
import { StateCommandFactory } from './state_command_factory';

@Injectable()
export class StateCommandService {
	static state_command_list: StateCommand[];

	constructor(private readonly stateCmdFactory: StateCommandFactory) {
		StateCommandService.state_command_list = [];
		this.initStateCommand(stateCmdFactory);
	}
	
	addLightStateCommand(name: string, f_state: ((f_state: LightState)=>LightState)) {
		let state_cmd: StateCommand = this.stateCmdFactory.createStateCommand<LightState>(name, FunctionType.light, f_state);
		StateCommandService.state_command_list.push(state_cmd);
	}

	addLockStateCommand(name: string, f_state: ((f_state: LockState)=>LockState)) {
		let state_cmd: StateCommand = this.stateCmdFactory.createStateCommand<LockState>(name, FunctionType.lock, f_state);
		StateCommandService.state_command_list.push(state_cmd);
	}

	getCommandById(id: number): StateCommand | null{
		if (id >= StateCommandService.state_command_list.length)
			console.error("Command list index out of bound error");
		return StateCommandService.state_command_list[id];
	}

	initStateCommand(factory: StateCommandFactory) {
		this.addLightStateCommand("turn on light", (state) => {
			state.light_state = LightStateEnum.ON;
			return state;
		});

		this.addLightStateCommand("turn off light", (state) => {
			state.light_state = LightStateEnum.OFF;
			return state;
		});
	}
}
