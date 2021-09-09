import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormsSchema } from './forms.schema';
import { FormsService } from './forms.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormsSchema }]),
  ],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}
