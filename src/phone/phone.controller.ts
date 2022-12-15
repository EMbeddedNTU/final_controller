import { Body, Controller, Get, Post } from '@nestjs/common';
import { GestureSetting } from 'src/config/gesture_config';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('add')
  addGesture(@Body() body: GestureSetting): boolean {
    return this.phoneService.addGesture(body);
  }

  @Post('delete')
  deleteGesture(@Body() body: GestureSetting): boolean {
    return this.phoneService.deleteGesture(body);
  }

  @Get('gestureList')
  getGestureList(): GestureSetting[] {
    return this.phoneService.getGestureList();
  }
}
