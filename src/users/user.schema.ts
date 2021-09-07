import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  goal: string;

  @Prop({ required: true })
  interest: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
