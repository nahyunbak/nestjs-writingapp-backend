import { IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
