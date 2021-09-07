import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Set, SetDocument } from './sets.schema';
import { CreateSetDto } from 'src/dto/create-set.dto';

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private setModel: Model<SetDocument>) {}

  async create(createSetDto: CreateSetDto): Promise<Set> {
    const createdSet = new this.setModel(createSetDto);
    return createdSet.save();
  }

  async findAll(): Promise<Set[]> {
    return this.setModel.find().exec();
  }
}
