import { NestFactory } from '@nestjs/core';
import { Agent, AgentLocation } from './agent/agent';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { EffectType, GestureConfig, GestureEffect, GestureSetting, GestureType } from './config/gesture_config';
import { StateCommand } from './state/state_command';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // NOTE: test
  let service: ConfigService = new ConfigService()
  let g_c = new GestureConfig([new GestureSetting(GestureType.backward, new Agent(0, "test", [], AgentLocation.attic), EffectType.local, [
      new GestureEffect(new Agent(0, "test", [], AgentLocation.attic), new StateCommand(0, (s)=>{return s}).id)
    ])
  ]);
  service.saveGestureConfig(g_c)
  let g: GestureConfig = service.readGestureConfig()
}
bootstrap();
