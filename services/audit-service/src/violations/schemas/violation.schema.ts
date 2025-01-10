import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ViolationType } from '@/violations/constants/violation-type';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Violation {
  @Prop({
    type: String,
    required: true,
    enum: Object.values(ViolationType),
  })
  type: ViolationType;
}

export type ViolationDocument = HydratedDocument<Violation>;

export const ViolationSchema = SchemaFactory.createForClass(Violation);
