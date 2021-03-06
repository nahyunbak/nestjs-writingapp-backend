import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  interest: string[];

  @Prop()
  status: string[];

  @Prop()
  progress: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);
