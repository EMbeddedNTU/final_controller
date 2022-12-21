import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  let service: ConfigService = new ConfigService();
  service.saveAgentConfig({ agents: [] });
  service.saveGestureConfig({ gestureSettings: [] });
}
bootstrap();
