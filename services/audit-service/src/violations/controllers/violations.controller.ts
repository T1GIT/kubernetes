import { Controller, Get} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ViolationExternal } from '@/violations/dto/violation-external';
import { ViolationsService } from '@/violations/services/violations.service';
import { ViolationType } from '@/violations/constants/violation-type';
import {ViolationDocument} from "@/violations/schemas/violation.schema";

@Controller()
export class ViolationsController {

  constructor(
    private violationsService: ViolationsService
  ) {}

  @EventPattern('config-violation')
  async onConfigViolation(@Payload() data: ViolationExternal): Promise<void> {
    await this.violationsService.save(data, ViolationType.CONFIG);
  }

  @Get('/violations')
  async getAll(): Promise<ViolationDocument[]> {
      return this.violationsService.getAll();
  }
}
