import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RepairExternal } from '../dto/repair-external';
import { RepairService } from '../services/repair.service';
import { RepairDocument } from '../schemas/repair.schema';
import { RepairType } from '../constants/repair-type';

@Controller()
export class RepairsController {
  constructor(private repairService: RepairService) {}

  @EventPattern('config-repair')
  async onConfigRepair(@Payload() data: RepairExternal): Promise<void> {
    await this.repairService.save(data, RepairType.CONFIG);
  }

  @Get('/repairs')
  async getAll(): Promise<RepairDocument[]> {
    return this.repairService.getAll();
  }
}