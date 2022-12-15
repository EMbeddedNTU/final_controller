import { Module } from '@nestjs/common';
import { StateCommandFactory } from './state_command_factory';
import { StateCommandService } from './state_command_service';

@Module({
  imports: [],
  controllers: [],
  providers: [StateCommandService, StateCommandFactory],
})
export class StateCommandModule {}
