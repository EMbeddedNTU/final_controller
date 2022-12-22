import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { ConfigModule } from './config/config.module';
import { GestureModule } from './gesture/gesture.module';
import { NotificationModule } from './notification/notification.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [AgentModule, PhoneModule, ConfigModule, GestureModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
