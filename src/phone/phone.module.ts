import { Module } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { GestureService } from 'src/gesture/gesture.service';
import { StateCommandModule } from 'src/state/state_command.module';
import { StateCommandFactory } from 'src/state/state_command_factory';
import { StateCommandService } from 'src/state/state_command_service';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

@Module({
  imports: [ConfigModule, StateCommandModule],
  controllers: [PhoneController],
  providers: [
    PhoneService,
    ConfigService,
    AgentService,
    GestureService,
    StateCommandService,
    StateCommandFactory,
  ],
})
export class PhoneModule {}
