import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { StateCommandModule } from 'src/state/state_command.module';
import { StateCommandFactory } from 'src/state/state_command_factory';
import { StateCommandService } from 'src/state/state_command_service';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
  imports: [ConfigModule, StateCommandModule],
  controllers: [AgentController],
  providers: [
    AgentService,
    ConfigService,
    StateCommandService,
    StateCommandFactory,
  ],
})
export class AgentModule {}
