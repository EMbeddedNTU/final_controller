import { Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { readFileSync, writeFileSync } from 'fs';
import { NotificationData, Notification } from './notification';

@Injectable()
export class NotificationService {
    //   constructor() {}
    static NotificationFilepath = "./src/notification/notification.json" 

    readNotifications(): NotificationData {
        const gestureConfigJson: string = readFileSync(
            NotificationService.NotificationFilepath,
            { flag: 'r' },
        ).toString();
        const gestureConfigJsonObj = JSON.parse(gestureConfigJson);
        const notificationData: NotificationData = plainToInstance(
            NotificationData,
            gestureConfigJsonObj,
        );
        return notificationData;
    }

    saveNotifications(notificationData: NotificationData) {
        const notificationJson: string = JSON.stringify(
            instanceToPlain(notificationData),
            null,
            ' ',
        );

        writeFileSync(NotificationService.NotificationFilepath, notificationJson, {
            flag: 'w',
        });
    }

    getNotifications(): Notification[] {
        const notificationData: NotificationData = this.readNotifications();
        return notificationData.data;
    }

    addNotification(input: Notification): boolean {
        const notificationData: NotificationData = this.readNotifications();
        notificationData.data.push(input)
        this.saveNotifications(notificationData);
        return true;
    }
}
