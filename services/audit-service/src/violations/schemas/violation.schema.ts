import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ViolationType } from '../constants/violation-type';

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
