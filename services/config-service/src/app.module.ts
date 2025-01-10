import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferencesModule } from '@/references';
import { ControlModule } from '@/control';
import { ScheduleModule } from '@nestjs/schedule';
import * as process from 'node:process';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`,
    ),
    ScheduleModule.forRoot(),
    ReferencesModule,
    ControlModule,
  ],
})
export class AppModule {}
