import { Agent } from "src/agent/agent";

export class AgentConfig {
    
    constructor (
        agents: Agent[]
    ){
        this.agents = agents
    }

    agents: Agent[]
}
