import { Module } from '@nestjs/common';
import { ViolationsModule } from '@/violations';
import { RepairsModule } from '@/repairs';

@Module({
  imports: [ViolationsModule, RepairsModule],
})
export class AppModule {}
