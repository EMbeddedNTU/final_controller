import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService],
})
export class ConfigModule {}
