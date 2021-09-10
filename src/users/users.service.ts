import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  //user 데이터 생성 로직 >> auth 회원가입 서비스 로직
  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
    return createdUser;
  }
  //user 데이터 삭제 로직 >> auth 회원 탈퇴 로직
  async deleteUser(username: string, password: string) {
    await this.userModel
      .findOneAndDelete({
        username: username,
        password: password,
      })
      .exec();
    const deletedUser = this.findOne(username);
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

  //로그인 서비스 로직(-찾는 로직)
  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async saveStatus(
    username: string,
    status?: string,
  ): Promise<User | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username: username },
      {
        $push: {
          status: status,
        },
      },
    );
    return updatedUser;
  }

  async saveInterest(
    username: string,
    interest?: string,
  ): Promise<User | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username: username },
      {
        $push: {
          interest: interest,
        },
      },
    );
    return updatedUser;
  }

  async saveProgress(
    username: string,
    progress?: string,
  ): Promise<User | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username: username },
      {
        $push: {
          progress: progress,
        },
      },
    );
    return updatedUser;
  }
}

//몽고db 써넣기.
//users는 말이여. 몽고db로다가 저장해둔 그런 유저 id와 password들이여. 알간?
/*
export type User = any;


@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
*/
