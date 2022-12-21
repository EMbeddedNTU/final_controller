import { Module } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { ConfigService } from 'src/config/config.service';
import { StateCommandModule } from 'src/state/state_command.module';
import { StateCommandFactory } from 'src/state/state_command_factory';
import { StateCommandService } from 'src/state/state_command_service';
import { GestureService } from './gesture.service';

@Module({
  imports: [StateCommandModule],
  controllers: [],
  providers: [
    ConfigService,
    AgentService,
    GestureService,
    StateCommandService,
    StateCommandFactory,
  ],
})
export class GestureModule {}