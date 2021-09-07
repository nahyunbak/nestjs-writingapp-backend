import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly paasword: string;

  @IsOptional()
  @IsObject()
  readonly status: { 작가: boolean; '출판사 관계자': boolean };

  @IsOptional()
  @IsObject()
  readonly interest: { '많은 인세': boolean; '어휘력 향상': boolean };
}
