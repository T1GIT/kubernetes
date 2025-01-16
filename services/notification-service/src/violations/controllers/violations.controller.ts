import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ViolationBaseDto } from '../dto/violation-base.dto';
import { ViolationsGateway } from '../gateways/violations.gateway';

@Controller()
export class ViolationsController {
  constructor(private violationsGateway: ViolationsGateway) {}

  @EventPattern('violation')
  async onViolation(@Payload() data: ViolationBaseDto): Promise<void> {
    console.log('violation', data);
    this.violationsGateway.violation(data);
  }
}
