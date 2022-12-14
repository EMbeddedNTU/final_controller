import { Type } from 'class-transformer';
import { Agent } from 'src/agent/agent';

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
  constructor(agent: Agent, command_id: number) {
    this.agent = agent;
    this.command_id = command_id;
  }

  agent: Agent;

  command_id: number;
}

export class GestureSetting {
  constructor(
    gestureType: GestureType,
    agent_trigger: Agent,
    effect_type: EffectType,
    effects: GestureEffect[],
  ) {
    this.gestureType = gestureType;
    this.agent_trigger = agent_trigger;
    this.effect_type = effect_type;
    this.effects = effects;
  }

  gestureType: GestureType;

  agent_trigger: Agent;

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
