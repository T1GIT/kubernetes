import { Module } from '@nestjs/common';
import { RepairsController } from './controllers/repairs.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPAIRS_NOTIFY_SERVICE } from './constants/injections';
import { RepairsGateway } from './gateways/repairs.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REPAIRS_NOTIFY_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [RepairsController],
  providers: [RepairsGateway],
})
export class RepairsModule {}
