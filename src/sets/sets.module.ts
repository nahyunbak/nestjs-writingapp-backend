import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { Set, SetsSchema } from './sets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Set.name, schema: SetsSchema }]),
  ],
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
