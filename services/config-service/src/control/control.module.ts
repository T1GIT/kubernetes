import { Module } from '@nestjs/common';
import { ReferencesModule } from '@/references';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ControlService } from './services/control.service';
import { CONTROL_SERVICE } from './constants/injections';
import { ControlController } from './controllers/control.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Violation, ViolationSchema } from './schemas/violation.schema';
import { Repair, RepairSchema } from './schemas/repair.schema';

@Module({
  imports: [
    ReferencesModule,
    ClientsModule.register([
      {
        name: CONTROL_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: Violation.name, schema: ViolationSchema },
      { name: Repair.name, schema: RepairSchema },
    ]),
  ],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
