import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Reference } from '@/references';
import { Violation } from '@/control/schemas/violation.schema';

export type RepairDocument = HydratedDocument<Reference>;

@Schema({ timestamps: true })
export class Repair {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Violation.name,
    required: true,
  })
  violation: Violation;

  @Prop({ required: true })
  content: string;
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
