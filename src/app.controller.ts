import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SetsService } from './sets/sets.service';
import { CreateFormDto } from './dto/create-form.dto';
import { FormsService } from './forms/forms.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private setService: SetsService,
    private formService: FormsService,
  ) {}
  //forms create(temp )
  @Post('create/level')
  async createLevel(@Body() body: CreateFormDto) {
    return this.formService.create(body);
  }

  //forms info (temp)
  @Get('get/forminfo')
  async getFormByLevel(@Body() body: CreateFormDto) {
    return this.formService.getFormInfo(body.level);
  }

  //get progress by username -- user에 progress 칼럼(optional ) 만들기
  //form에 접속: formId를 param으로 가져오되 기존 id보다 1높지 않으면or 로그인 된 유저가 아니면 에러 띄우기. 1 높으면& 로그인 된 유저면 통과시키기.
  //저장: formId를 param으로 가져오고 토큰도 가져오고 / param으로 level확인, 토큰에서 유저 확인 뒤 set에 각종 정보 저장하기. user에 진도 업데이트하기 .

  //토큰 받아와서 /username 뽑아낸 뒤 이것으로 set에서 모든 정보 검색 뒤 보내주기

  //bcrypt추가(비밀번호 저장 제대로 하기)
  //서비스 추가
  //auth: 토큰에서 유저 이름 뽑아내 복호화 뒤 확인하는 프로세스
  // form: formId를 인자로 받고 title과 기타 등등 정보를 뱉어내는 프로세스
  // set: usernma과 param, title 등을 주면 그대로 뱉어내는 프로세스
  //appcontroller: set서비스를 사용하되, 인자에는 formservice를 이용하여title 등을 채워넣기

  @Post('auth/signup')
  async createAccount(@Body() body: CreateUserDto) {
    const user = this.authService.createAcount(body);
    const set = this.setService.create({
      username: 'q',
      level: 'd',
      question: 'd',
      answer: 'dd',
    });

    const access_token = this.authService.login(user);
    const result = {
      token: access_token,
      statusCode: 200,
      message: 'Success to signup',
    };
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  // jwtservice를 이용해 토큰을 decode 해봄. 근데 사실상 필요 없었음 왜냐면 위에서 auth 등으로 저장해놨기 때문에..
  // 그러니까 굳이 토큰에서 username을 뽑아낼 필요는 없는..?

  @Get('realprofile')
  getRealProfile(@Body() body) {
    if (this.authService.checkUser(body.user)) {
      return this.authService.checkUser(body.user);
    }
    return 0;
  }
}
