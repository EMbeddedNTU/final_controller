import { Injectable } from '@nestjs/common';
import { Agent, gestureInput } from './agent';
import { FunctionState, FunctionType } from './function_state';

@Injectable()
export class AgentService {
  private table: Agent[] = [];

  registerAgent(body: Agent): boolean {
    let targetAgent: Agent = this.table.find(
      (agent: Agent) => agent.name == body.name,
    );

    if (targetAgent == undefined) {
      this.table.push(body);
    } else {
      Object.assign(targetAgent, body);
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
      targetFunctionState.state = 1 - targetFunctionState.state;
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
