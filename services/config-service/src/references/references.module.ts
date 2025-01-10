import { Module } from '@nestjs/common';
import { ReferencesController } from './controllers/references.controller';
import { ReferencesService } from './services/references.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reference, ReferenceSchema } from './schemas/reference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reference.name, schema: ReferenceSchema },
    ]),
  ],

  controllers: [ReferencesController],
  providers: [ReferencesService],
  exports: [ReferencesService],
})
export class ReferencesModule {}
