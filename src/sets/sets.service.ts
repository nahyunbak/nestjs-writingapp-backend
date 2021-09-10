import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Set, SetDocument } from './sets.schema';
import { CreateSetDto } from 'src/dto/create-set.dto';

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private setModel: Model<SetDocument>) {}
  // 첫 생성하기: level은 뭐냐 그거지 params로 받아오고, userid는 body에서 받아오고,
  // title은 form에서 가져오고, answer만 가져오면 됨.
  async create(createSetDto: CreateSetDto): Promise<Set> {
    const createdSet = new this.setModel(createSetDto);
    return createdSet.save();
  }

  //user이름과 업데이트할 level, answr들어오면 업데이트하기
  async update(username: string, formId: string, answer: string): Promise<Set> {
    const updatedSet = this.setModel.findOneAndUpdate(
      { username: username, formId: formId },
      {
        $set: {
          answer: answer,
        },
      },
    );
    return updatedSet;
  }
  async deleteSetByUsername(username: string) {
    const deletedUser = await this.setModel
      .deleteMany({
        username: username,
      })
      .exec();

    if (deletedUser) {
      const failure = {
        statuscode: 404,
        message: 'Failed to delete account',
      };
    }
    const success = {
      statuscode: 200,
      message: 'success to delete account',
    };
    return success;
  }
}

//user이름이 들어오면 level, title, answer 업데이트하기
