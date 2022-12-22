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
  // specific,
  global,
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
    effectType: EffectType,
    effects: GestureEffect[],
    agentTarget?: Agent | null,
    agentTrigger?: Agent | null,
  ) {
    this.gestureType = gestureType;
    this.effectType = effectType;
    this.effects = effects;
    this.agentTarget = agentTarget;
    this.agentTrigger = agentTrigger;
  }

  gestureType: GestureType;

  effectType: EffectType;
  
  agentTarget?: Agent | null;
  
  agentTrigger?: Agent | null;

  @Type(() => GestureEffect)
  effects: GestureEffect[];
}

export class GestureConfig {
  constructor(gestureSettings: GestureSetting[]) {
    this.gestureSettings = gestureSettings;
  }

  @Type(() => GestureSetting)
  gestureSettings: GestureSetting[];
}
