import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //sign in
  /*
  async createAcount(createUserDto: CreateUserDto): Promise<User> {
    const createdAccount = this.usersService.create(createUserDto);
    return createdAccount;
  }
  */
  //login

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

/*
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  //user 데이터 생성 로직 >> auth 회원가입 서비스 로직
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
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
  async findOne(username: string, password: string): Promise<User | undefined> {
    return this.userModel
      .findOne({ username: username, password: password })
      .exec();
  }
}

*/

/*
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

*/
/**
 * import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  goal: string[];

  @Prop()
  interest: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);

 * 
 */
