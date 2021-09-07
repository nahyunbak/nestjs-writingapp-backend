import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SetDocument = Set & mongoose.Document;

@Schema()
export class Set {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  forms: [level: string, ask: string, answer: string];
}

export const SetsSchema = SchemaFactory.createForClass(Set);
