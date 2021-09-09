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

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  async createAccount(@Body() body: CreateUserDto) {
    const user = this.authService.createAcount(body);
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
  async login(@Request() req) {
    return this.authService.login(req.user);
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
