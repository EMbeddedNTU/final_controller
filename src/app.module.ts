import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AgentModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
