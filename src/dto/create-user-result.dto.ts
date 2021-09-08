import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserResultDto {
  @IsObject()
  readonly user: {
    name: string;
    username: string;
    password: string;
  };

  @IsNumber()
  readonly statuscode: number;

  @IsString()
  readonly message: string;
}
