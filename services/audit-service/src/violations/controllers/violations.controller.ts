import { ConsoleLogger, Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ViolationExternal } from '@/violations/dto/violation-external';
import { ViolationsService } from '@/violations/services/violations.service';
import { ViolationType } from '@/violations/constants/violation-type';

@Controller()
export class ViolationsController {

  constructor(
    private violationsService: ViolationsService
  ) {}

  @EventPattern('config-violation')
  async onConfigViolation(@Payload() data: ViolationExternal): Promise<void> {
    await this.violationsService.save(data, ViolationType.CONFIG);
  }
}
