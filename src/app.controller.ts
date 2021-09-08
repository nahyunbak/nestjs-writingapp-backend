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
  /*

  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  async createAccount(@Body() body: CreateUserDto) {
    return this.authService.createAcount(body);
  }
  */

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
}

/**
 * 
 * port { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsArray()
  readonly status: string[];

  @IsOptional()
  @IsArray()
  readonly interest: string[];
}

 */

/*

*/
