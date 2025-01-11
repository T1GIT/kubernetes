import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ViolationExternal } from '../dto/violation-external';
import { ViolationsService } from '../services/violations.service';
import { ViolationDocument } from '../schemas/violation.schema';
import { ViolationType } from '../constants/violation-type';

@Controller()
export class ViolationsController {
  constructor(private violationsService: ViolationsService) {}

  @EventPattern('config-violation')
  async onConfigViolation(@Payload() data: ViolationExternal): Promise<void> {
    await this.violationsService.save(data, ViolationType.CONFIG);
  }

  @Get('/violations')
  async getAll(): Promise<ViolationDocument[]> {
    return this.violationsService.getAll();
  }
}
