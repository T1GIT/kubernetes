import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Reference } from '@/references';

export type ViolationDocument = HydratedDocument<Violation>;

@Schema({ timestamps: true })
export class Violation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Reference.name,
    required: true,
  })
  reference: Reference;

  @Prop({ required: true })
  content: string;
}

export const ViolationSchema = SchemaFactory.createForClass(Violation);
