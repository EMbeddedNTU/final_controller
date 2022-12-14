import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GestureService } from 'src/gesture/gesture.service';
import {
    AddGestureInput,
    DeleteGestureInput,
} from 'src/gesture/gesture_request_type';
import {
    GestureSettingOption,
    StateCommandOption,
    TransformedGestureSetting,
} from './phone';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
    constructor(
        private readonly phoneService: PhoneService,
        private readonly gestureService: GestureService,
    ) {}

    @Get('gestureList')
    getGestureList(): TransformedGestureSetting[] {
        return this.phoneService.getGestureList();
    }

    @Get('gestureSettingOption')
    getGestureOption(): GestureSettingOption {
        return this.phoneService.getGestureOption();
    }

    @Get('stateCommandOption')
    getAllStateCommandOption(): StateCommandOption[] {
        return this.phoneService.getAllStateCommandOption();
    }

    @Get('stateCommandOption/:agentId')
    getStateCommandOption(
        @Param('agentId') agentId: number | null,
    ): StateCommandOption[] {
        return this.phoneService.getStateCommandOption(agentId);
    }

    @Post('addGesture')
    addGesture(@Body() body: AddGestureInput): boolean {
        return this.gestureService.addGesture(body);
    }

    @Post('deleteGesture')
    deleteGesture(@Body() body: DeleteGestureInput): boolean {
        return this.gestureService.deleteGesture(body);
    }
}
