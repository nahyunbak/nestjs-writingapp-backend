import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SetsService } from './sets/sets.service';
import { CreateFormDto } from './dto/create-form.dto';
import { FormsService } from './forms/forms.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private setService: SetsService,
    private formService: FormsService,
    private userService: UsersService,
  ) {}

  //forms create(temp )
  @Post('create/level')
  async createLevel(@Body() body: CreateFormDto) {
    return await this.formService.create(body);
  }

  //formid를 인자로 받고 title, contents 등 form 정보를 리턴한다.
  @Get('set/getinfo')
  async getFormById(@Param() param) {
    return await this.formService.getFormInfo(param);
  }
  /*
  param에는 formId가 들어간다 
  body 구조
  {
    user: jwt토큰, 
    answer: 유저가 작성한 답. 
  }
  */

  @Post('set/saveinfo/:id')
  async saveSet(@Param('id') formId, @Body() body) {
    const info = await this.formService.getFormInfo(formId);
    const username = await this.authService.getUsername(body.user);
    const result = {
      username: username,
      formId: formId,
      title: info.title,
      answer: body.answer,
    };
    return this.setService.create(result);
  }

  @Post('set/updateinfo/:id')
  async updateSet(
    @Param('id') formId,
    @Body() body: { answer: string; token: string },
  ) {
    const username = await this.authService.getUsername(body.token);

    const result = this.setService.update(username, formId, body.answer);
    return result;
  }

  //통과 - 유저 존재 시 401 에러/ 유저 존재하지 않을 시 만들고 토큰 뱉음
  @Post('auth/signup')
  async createAccount(@Body() body: CreateUserDto) {
    const result = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (result) {
      return {
        statuscode: 401,
        message: 'The user already exists',
      };
    }
    const user = await this.authService.createAcount(body);
    const access_token = await this.authService.login(user);

    return {
      access_token,
      statuscode: 200,
      message: 'User account is created',
    };
  }

  //로그인할 경우, 프론트엔드에서 토큰을 auth 등에 저장해 줘야 한다.

  @UseGuards(LocalAuthGuard)
  @Get('auth/login')
  async login(@Body() body) {
    const { password } = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (password === body.password) {
      return this.authService.login(body);
    }
  }

  //회원탈퇴 로직
  @Delete('auth/deleteaccount')
  async deleteAccount(@Body() body: { username: string; password: string }) {
    const { username, password } = await this.authService.validateUser(
      body.username,
      body.password,
    );
    const resultSet = await this.setService.deleteSetByUsername(username);
    const resultUser = await this.userService.deleteUser(username, password);
    return { resultUser, resultSet };
  }

  //이름을 반환해줌
  @Get('auth/username')
  async getRealProfile(@Body() body: { user: string }) {
    if (this.authService.getUsername(body.user)) {
      return await this.authService.getUsername(body.user);
    }
    return 0;
  }

  //설문조사 정보 업데이트하기 -status
  @Post('auth/userdetail/status')
  async saveUserStatus(@Body() body: { username: string; status: string }) {
    const updatedUser = await this.userService.saveStatus(
      body.username,
      body.status,
    );
    return updatedUser;
  }

  //설문조사 정보 업데이트하기 -interest
  @Post('auth/userdetail/interest')
  async saveUserInterest(@Body() body: { username: string; interest: string }) {
    const updatedUser = await this.userService.saveInterest(
      body.username,
      body.interest,
    );
    return updatedUser;
  }
  //레벨 완료할 때마다 진행상황 업데이트하기 -progress
  @Post('auth/userdetail/progress')
  async saveUserProgress(@Body() body: { username: string; progress: string }) {
    const updatedUser = await this.userService.saveProgress(
      body.username,
      body.progress,
    );
    return updatedUser;
  }

  //param save 목적으로 부를 때마다 progress 에 업데이트

  //process.env 파일 등 생성하기 ~~

  /*
  //나중에 guard개념 배운 뒤 사용해보기 
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  */
}
