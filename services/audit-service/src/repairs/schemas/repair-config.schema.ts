import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ViolationConfig } from '@/violations';
import { RepairType } from '../constants/repair-type';

@Schema({ timestamps: true })
export class RepairConfig {
  type: RepairType;

  @Prop({
    type: ViolationConfig,
    required: true,
  })
  violation: ViolationConfig;

  @Prop({ required: true })
  content: string;
}

export type RepairConfigDocument = HydratedDocument<RepairConfig>;

export const RepairConfigSchema = SchemaFactory.createForClass(RepairConfig);
