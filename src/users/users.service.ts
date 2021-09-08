import { Model } from 'mongoose';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateUserResultDto } from 'src/dto/create-user-result.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  //user 데이터 생성 로직 >> auth 회원가입 서비스 로직
  async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResultDto | HttpException> {
    const searchResult = this.userModel.findOne({
      username: createUserDto.username,
    });
    if (searchResult) {
      throw new BadRequestException();
    }
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
    const createUserResult = {
      user: createdUser,
      statuscode: 200,
      message: 'Success to sign up',
    };

    return createUserResult;
  }
  //user 데이터 삭제 로직 >> auth 회원 탈퇴 로직
  async deleteUser(createUserDto: CreateUserDto) {
    this.userModel
      .findOneAndDelete({
        username: createUserDto.username,
        password: createUserDto.password,
      })
      .exec();
  }

  //로그인 서비스 로직
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
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
