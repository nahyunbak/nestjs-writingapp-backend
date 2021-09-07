import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Set, SetDocument } from './sets.schema';

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private setModel: Model<SetDocument>) {}
  // 첫 생성하기
  async create(createSetDto: CreateSetDto): Promise<Set> {
    const createdSet = new this.setModel(createSetDto);
    return createdSet.save();
  }

  //두 번째부터 
  async createAndUpdate()
  // 포스트 업데이트하기

  async update(createSetDto: CreateSetDto): Promise<Set>{
    const insertedSet =this.setModel.findOne( {userId: createSetDto.userId})
    .insertOne({
      'forms.array':{level: createSetDto.forms.level}
    })

    )
    return insertedSet
  }
    userId: string,
    level: string,
    answer: string,
  ): Promise<boolean> {
    const updatedSet = this.setModel.findOneAndUpdate(
      { userId: userId, 'forms.array.level': level },
      {
        $set: {
          'forms.array.answer': answer,
        },
      },
    );
    if (updatedSet) {
      return true;
    }
    return false;
  }

  async findAll(): Promise<Set[]> {
    return this.setModel.find().exec();
  }
}

import { IsObject, IsString } from 'class-validator';

export class CreateSetDto {
  @IsString()
  readonly userId: string;

  @IsObject()
  readonly forms: { level: string; ask: string; answer: string };
}
