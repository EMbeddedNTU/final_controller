import { NestFactory } from '@nestjs/core';
import { Agent, AgentLocation } from './agent/agent';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { EffectType, GestureConfig, GestureEffect, GestureSetting, GestureType } from './config/gesture_config';
import { FunctionType } from './state/function_state';
import { StateCommand } from './state/state_command';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // NOTE: test
  let service: ConfigService = new ConfigService()
  let g_c = new GestureConfig([new GestureSetting(GestureType.backward, EffectType.local, [
      new GestureEffect(new StateCommand(0, "test_command", FunctionType.light, (s)=>{return s}), new Agent(0, "test", [], AgentLocation.attic))
    ], new Agent(0, "test", [], AgentLocation.attic))
  ]);
  service.saveGestureConfig(g_c)
  let g: GestureConfig = service.readGestureConfig()
  console.log(g)
  console.log(g.gesture_settings[0].effects[0].command.state_function)
}
bootstrap();
