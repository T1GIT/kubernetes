import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Violation, ViolationSchema } from './schemas/violation.schema';
import { ViolationConfigSchema } from './schemas/violation-config.schema';
import { ViolationsController } from './controllers/violations.controller';
import { ViolationsService } from './services/violations.service';
import { ViolationType } from './constants/violation-type';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VIOLATIONS_LOG_SERVICE } from './constants/injections';

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
    ClientsModule.register([
      {
        name: VIOLATIONS_LOG_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  providers: [ViolationsService],
  controllers: [ViolationsController],
})
export class ViolationsModule {}
