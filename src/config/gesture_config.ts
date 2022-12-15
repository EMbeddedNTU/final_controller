import { Type } from 'class-transformer';
import { Agent } from 'src/agent/agent';
import { StateCommand } from 'src/state/state_command';

export enum GestureType {
  left,
  right,
  backward,
  forward,
  down,
  up,
}

export enum EffectType {
  local,
  specific,
}

export class GestureEffect {
  constructor(command: StateCommand, agent?: Agent | null) {
    this.agent = agent;
    this.command = command;
  }

  agent?: Agent | null;

  command: StateCommand;
}

export class GestureSetting {
  constructor(
    gestureType: GestureType,
    effect_type: EffectType,
    effects: GestureEffect[],
    agent_trigger?: Agent | null,
  ) {
    this.gestureType = gestureType;
    this.effect_type = effect_type;
    this.effects = effects;
    this.agent_trigger = agent_trigger;
  }

  gestureType: GestureType;

  agent_trigger?: Agent | null;

  effect_type: EffectType;

  @Type(() => GestureEffect)
  effects: GestureEffect[];
}

export class GestureConfig {
  constructor(gesture_settings: GestureSetting[]) {
    this.gesture_settings = gesture_settings;
  }

  @Type(() => GestureSetting)
  gesture_settings: GestureSetting[];
}
