import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { AgentConfig } from './agent_config';
import { plainToInstance  } from 'class-transformer';
import { GestureConfig } from './gesture_config';

@Injectable()
export class ConfigService {

    static AgentConfigFilepath: string = "./src/config/agent_config.json" 
    static GestureConfigFilepath: string = "./src/config/gesture_config.json" 

	readAgentConfig(): AgentConfig {
        let agent_config_json: string = readFileSync(ConfigService.AgentConfigFilepath, {flag: 'r'}).toString()
        let agent_config: AgentConfig = plainToInstance(AgentConfig, agent_config_json);
        return agent_config;
	}

    saveAgentConfig(agent_config: AgentConfig) {
        
        let agent_config_json: string = JSON.stringify(agent_config, null, " ");

        writeFileSync(ConfigService.AgentConfigFilepath, agent_config_json, {
            flag: 'w',
        });
    }

    readGestureConfig(): GestureConfig {
        let gesture_config_json: string = readFileSync(ConfigService.GestureConfigFilepath, {flag: 'r'}).toString()
        let gesture_config: GestureConfig = plainToInstance(GestureConfig, gesture_config_json);
        return gesture_config;
	}

    saveGestureConfig(gesture_config: GestureConfig) {
        
        let gesture_config_json: string = JSON.stringify(gesture_config, null, " ");

        writeFileSync(ConfigService.GestureConfigFilepath, gesture_config_json, {
            flag: 'w',
        });
    }
}
