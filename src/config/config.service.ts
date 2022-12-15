import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { AgentConfig } from './agent_config';
import { instanceToPlain, plainToInstance  } from 'class-transformer';
import { GestureConfig } from './gesture_config';

@Injectable()
export class ConfigService {

    static AgentConfigFilepath: string = "./src/config/agent_config.json" 
    static GestureConfigFilepath: string = "./src/config/gesture_config.json" 

	readAgentConfig(): AgentConfig {
        let agentConfigJson: string = readFileSync(ConfigService.AgentConfigFilepath, {flag: 'r'}).toString();
        let agentConfigJsonObj = JSON.parse(agentConfigJson);
        let agentConfig: AgentConfig = plainToInstance(AgentConfig, agentConfigJsonObj);
        return agentConfig;
	}

    saveAgentConfig(agentConfig: AgentConfig) {
        
        let agentConfigJson: string = JSON.stringify(instanceToPlain(agentConfig), null, " ");

        writeFileSync(ConfigService.AgentConfigFilepath, agentConfigJson, {
            flag: 'w',
        });
    }

    readGestureConfig(): GestureConfig {
        let gestureConfigJson: string = readFileSync(ConfigService.GestureConfigFilepath, {flag: 'r'}).toString();
        let gestureConfigJsonObj = JSON.parse(gestureConfigJson);
        let gestureConfig: GestureConfig = plainToInstance(GestureConfig, gestureConfigJsonObj);
        return gestureConfig;
	}

    saveGestureConfig(gestureConfig: GestureConfig) {
        
        let gestureConfigJson: string = JSON.stringify(instanceToPlain(gestureConfig), null, " ");

        writeFileSync(ConfigService.GestureConfigFilepath, gestureConfigJson, {
            flag: 'w',
        });
    }
}
