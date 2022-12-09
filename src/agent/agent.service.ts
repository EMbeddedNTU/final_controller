import { Injectable } from '@nestjs/common';
import { Agent } from 'http';

@Injectable()
export class AgentService {

	private table: Agent[] = [

	]

	registerAgent(req: Request): boolean {
		return true
	}

	getStatus(id: number) {

		return ;
	}
}
