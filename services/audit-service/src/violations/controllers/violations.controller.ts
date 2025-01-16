import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ViolationExternalDto } from '../dto/violation-external.dto';
import { ViolationsService } from '../services/violations.service';
import { ViolationDocument } from '../schemas/violation.schema';
import { ViolationType } from '../constants/violation-type';

@Controller()
export class ViolationsController {
  constructor(private violationsService: ViolationsService) {}

  @EventPattern('config-violation')
  async onConfigViolation(
    @Payload() data: ViolationExternalDto,
  ): Promise<void> {
    await this.violationsService.save(data, ViolationType.CONFIG);
  }

  @Get('/violations')
  async getAll(): Promise<ViolationDocument[]> {
    return this.violationsService.getAll();
  }
}
