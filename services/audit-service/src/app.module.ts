import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'node:process';
import { ViolationsModule } from '@/violations';
import { RepairsModule } from '@/repairs';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`,
    ),
    ViolationsModule,
    RepairsModule,
  ],
})
export class AppModule {}
