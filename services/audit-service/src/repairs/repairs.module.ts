import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Repair, RepairSchema } from './schemas/repair.schema';
import { RepairConfigSchema } from './schemas/repair-config.schema';
import { RepairsController } from './controllers/repairs.controller';
import { RepairService } from './services/repair.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPAIRS_LOG_SERVICE } from './constants/injections';
import { RepairType } from './constants/repair-type';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Repair.name,
        schema: RepairSchema,
        discriminators: [
          { name: RepairType.CONFIG, schema: RepairConfigSchema },
        ],
      },
    ]),
    ClientsModule.register([
      {
        name: REPAIRS_LOG_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  providers: [RepairService],
  controllers: [RepairsController],
})
export class RepairsModule {}
