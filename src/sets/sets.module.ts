import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetsService } from './sets.service';
import { Set, SetsSchema } from './sets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Set.name, schema: SetsSchema }]),
  ],
  providers: [SetsService],
  exports: [SetsService],
})
export class SetsModule {}
