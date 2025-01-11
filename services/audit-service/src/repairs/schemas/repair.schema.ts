import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RepairType } from '../constants/repair-type';

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Repair {
  @Prop({
    type: String,
    required: true,
    enum: Object.values(RepairType),
  })
  type: RepairType;
}

export type RepairDocument = HydratedDocument<Repair>;

export const RepairSchema = SchemaFactory.createForClass(Repair);
