import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { GestureSetting } from 'src/config/gesture_config';

@Injectable()
export class PhoneService {
  constructor(private readonly configService: ConfigService) {}

  getGestureList(): GestureSetting[] {
    return this.configService.readGestureConfig().gestureSettings;
  }
  deleteGesture(body: GestureSetting): boolean {
    let gestureConfig = this.configService.readGestureConfig();
    gestureConfig.gestureSettings = gestureConfig.gestureSettings.filter(
      (e) =>
        e.gestureType != body.gestureType || e.effectType != body.effectType,
    );
    this.configService.saveGestureConfig(gestureConfig);

    return true;
  }
  addGesture(body: GestureSetting): boolean {
    let gestureConfig = this.configService.readGestureConfig();
    gestureConfig.gestureSettings.push(body);
    this.configService.saveGestureConfig(gestureConfig);

    return true;
  }
}
