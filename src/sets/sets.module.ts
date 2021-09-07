import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { Set, SetsSchema } from './sets.schema';
import { Form, FormsSchema } from '../forms/forms.schema';
import { User, UsersSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Set.name, schema: SetsSchema }]),
    MongooseModule.forFeature([{ name: Form.name, schema: FormsSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
  ],
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
