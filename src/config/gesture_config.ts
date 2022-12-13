import { Agent } from "src/agent/agent";
import { StateCommand } from "src/state/state_command";

export enum GestureType {
    up,
    down,
    right,
    left,
    forward,
    backward
}

export class GestureEffect {
    
    agent: Agent;

    command: StateCommand;
}

export class GestureSetting {
    
    gestureType: GestureType;

    effects: GestureEffect[];

}


export class GestureConfig {
    
    constructor(
        gesture_settings: GestureSetting[]
    ) {
        this.gesture_settings = gesture_settings;
    }

    gesture_settings: GestureSetting[];
}
