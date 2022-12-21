
import { EffectType, GestureType } from "src/config/gesture_config";


export class AddGestureInput {

    gestureType: GestureType;
  
    effectType: EffectType;
  
    triggerAgentId?: number | null;
  
    stateCommandId: number;

    stateCommandAgentId: number; 
}


export class DeleteGestureInput {

    gestureType: GestureType;
  
    effectType: EffectType;
  
    triggerAgentId?: number;
}