import { Injectable } from '@nestjs/common';

@Injectable()
export class AgentService {


	registerAgent(req: Request): boolean {
		return true
	}

	getStatus(id: number) {

		return ;
	}
}
