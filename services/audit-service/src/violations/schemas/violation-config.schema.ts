import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ViolationType } from '@/violations/constants/violation-type';

@Schema({ timestamps: true })
export class Reference {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  content: string;
}

@Schema()
export class ViolationConfig {
  type: ViolationType;

  @Prop({
    type: Reference,
    required: true,
  })
  reference: Reference;

  @Prop({ required: true })
  content: string;
}

export type ViolationConfigDocument = HydratedDocument<ViolationConfig>;

export const ViolationConfigSchema =
  SchemaFactory.createForClass(ViolationConfig);
