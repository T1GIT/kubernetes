import { Controller, OnModuleInit } from '@nestjs/common';
import { ControlService } from '../services/control.service';
import { Interval } from '@nestjs/schedule';

@Controller()
export class ControlController implements OnModuleInit {
  constructor(private controlService: ControlService) {}

  async onModuleInit() {
    await this.controlService.checkAll();
  }

  @Interval(Number(process.env.INTERVAL) * 1000)
  async checkAll(): Promise<void> {
    await this.controlService.checkAll();
  }
}
