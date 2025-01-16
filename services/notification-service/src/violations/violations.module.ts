import { Module } from '@nestjs/common';
import { ViolationsGateway } from './gateways/violations.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VIOLATIONS_NOTIFY_SERVICE } from './constants/injections';
import { ViolationsController } from './controllers/violations.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: VIOLATIONS_NOTIFY_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  providers: [ViolationsGateway],
  controllers: [ViolationsController],
})
export class ViolationsModule {}
