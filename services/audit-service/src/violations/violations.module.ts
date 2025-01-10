import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Violation, ViolationSchema } from '@/violations/schemas/violation.schema';
import { ViolationType } from '@/violations/constants/violation-type';
import { ViolationConfigSchema } from '@/violations/schemas/violation-config.schema';
import { ViolationsController } from '@/violations/controllers/violations.controller';
import { ViolationsService } from '@/violations/services/violations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Violation.name,
        schema: ViolationSchema,
        discriminators: [
          { name: ViolationType.CONFIG, schema: ViolationConfigSchema },
        ],
      },
    ]),
  ],
  providers: [
    ViolationsService
  ],
  controllers: [
    ViolationsController
  ],
})
export class ViolationsModule {}
