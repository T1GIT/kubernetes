import { EventPattern, Payload } from '@nestjs/microservices';
import { RepairBaseDto } from '../dto/repair-base.dto';
import { Controller } from '@nestjs/common';
import { RepairsGateway } from '../gateways/repairs.gateway';

@Controller()
export class RepairsController {
  constructor(private repairsGateway: RepairsGateway) {}

  @EventPattern('repair')
  async onRepair(@Payload() data: RepairBaseDto): Promise<void> {
    console.log('repair', data);
    this.repairsGateway.repair(data);
  }
}
