import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

@Module({
  imports: [ConfigModule],
  controllers: [PhoneController],
  providers: [PhoneService, ConfigService],
})
export class PhoneModule {}
