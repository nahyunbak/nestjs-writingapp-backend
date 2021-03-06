import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FormDocument = Form & mongoose.Document;

@Schema()
export class Form {
  @Prop({ required: true })
  formId: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contents: string;
}

export const FormsSchema = SchemaFactory.createForClass(Form);
