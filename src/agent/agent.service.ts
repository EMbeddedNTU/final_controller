import { Injectable } from '@nestjs/common';
import { FunctionState, FunctionType } from 'src/state/function_state';
import { LightState } from 'src/state/light_state';
import { Agent, gestureInput } from './agent';

@Injectable()
export class AgentService {
  private table: Agent[] = [];

  registerAgent(body: Agent): boolean {
    let targetAgent: Agent = this.table.find(
      (agent: Agent) => agent.id == body.id,
    );

    if (targetAgent == undefined) {
      this.table.push(body);
    }

    console.log(this.table);

    return true;
  }

  gesture(body: gestureInput): boolean {
    let targetAgent: Agent = this.table.find(
      (agent: Agent) => agent.id == body.agentId,
    );

    if (targetAgent == undefined) {
      return false;
    } else {
      let targetFunctionState = targetAgent.functionStateList.find(
        (functionState: FunctionState) =>
          functionState.type == FunctionType.light,
      );
      
      let lightState = targetFunctionState as LightState;
      lightState.state = 1 - lightState.state;
      return true;
    }
  }

  getStatus(id: number): FunctionState[] {
    let targetAgent: Agent = this.table.find((agent: Agent) => agent.id == id);
    if (targetAgent == undefined) {
      return;
    } else {
      return targetAgent.functionStateList;
    }
  }
}
