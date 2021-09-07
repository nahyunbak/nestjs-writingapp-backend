import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as mongoose from 'mongoose';

export type SetDocument = Set & mongoose.Document;

@Schema()
export class Set {
  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  ask: string;

  @Prop({ required: true })
  answer: string;
}

export const SetsSchema = SchemaFactory.createForClass(Set);
