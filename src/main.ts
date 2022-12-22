import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { NotificationService } from './notification/notification.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  const service: ConfigService = new ConfigService();
  const notificationService: NotificationService = new NotificationService();
  service.saveAgentConfig({ agents: [] });
  // service.saveAgentConfig({ agents: [new Agent(0, "test_agent", [], "test_location")] });
  service.saveAgentConfig({ agents: [] });
  service.saveGestureConfig({ gestureSettings: [] });

  notificationService.saveNotifications({ data: [] });
}
bootstrap();
