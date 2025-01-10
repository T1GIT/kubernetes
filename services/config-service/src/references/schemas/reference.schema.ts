import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReferenceDocument = HydratedDocument<Reference>;

@Schema({ timestamps: true })
export class Reference {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  content: string;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);
