import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { AgentConfig } from './agent_config';
import { instanceToPlain, plainToInstance  } from 'class-transformer';
import { GestureConfig } from './gesture_config';

@Injectable()
export class ConfigService {

    static AgentConfigFilepath = "./src/config/agent_config.json" 
    static GestureConfigFilepath = "./src/config/gesture_config.json" 

	readAgentConfig(): AgentConfig {
        const agentConfigJson: string = readFileSync(ConfigService.AgentConfigFilepath, {flag: 'r'}).toString();
        const agentConfigJsonObj = JSON.parse(agentConfigJson);
        const agentConfig: AgentConfig = plainToInstance(AgentConfig, agentConfigJsonObj);
        return agentConfig;
	}

    saveAgentConfig(agentConfig: AgentConfig) {
        
        const agentConfigJson: string = JSON.stringify(instanceToPlain(agentConfig), null, " ");

        writeFileSync(ConfigService.AgentConfigFilepath, agentConfigJson, {
            flag: 'w',
        });
    }

    readGestureConfig(): GestureConfig {
        const gestureConfigJson: string = readFileSync(ConfigService.GestureConfigFilepath, {flag: 'r'}).toString();
        const gestureConfigJsonObj = JSON.parse(gestureConfigJson);
        const gestureConfig: GestureConfig = plainToInstance(GestureConfig, gestureConfigJsonObj);
        return gestureConfig;
	}

    saveGestureConfig(gestureConfig: GestureConfig) {
        
        const gestureConfigJson: string = JSON.stringify(instanceToPlain(gestureConfig), null, " ");

        writeFileSync(ConfigService.GestureConfigFilepath, gestureConfigJson, {
            flag: 'w',
        });
    }
}
