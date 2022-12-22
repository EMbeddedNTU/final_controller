import { Body, Controller, Get, Post } from '@nestjs/common';
import { Notification } from './notification';
import { NotificationService } from './notification.service';


@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Get('notifications')
  getNotifications() {
    return this.notificationService.getNotifications();
  }

  @Post('postNotification')
  postNotification(@Body() body: Notification): boolean {
    return this.notificationService.addNotification(body);
  }
}
