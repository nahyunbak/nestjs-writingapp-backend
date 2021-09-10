import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createAcount(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const result = {
      name: createUserDto.name,
      username: createUserDto.username,
      password: hash,
    };
    const createdUser = this.usersService.createUser(result);
    return createdUser;
  }

  //login
  /*
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  */
  //통과- 유저만 있을 경우 유저를 리턴, 패스워드도 같을 경우 패스워드까지 리턴
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      const { name, username } = user;
      if (isMatch) {
        return { name: name, username: username, password: pass };
      }
      return { name: name, username: username };
    }
    return null;
  }

  //verify<T extends object = any>(token: string, options?: JwtVerifyOptions): T;
  async getUsername(token: string): Promise<any> {
    const decoded = await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
    return decoded.username;
  }
  //username이 제대로 안들어왔잖아.
  async login(user: any) {
    const payload = await { username: user.username };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
    });
    return access_token;
  }
}
