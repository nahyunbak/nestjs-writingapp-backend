import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString({ each: true })
  readonly interest?: string[];

  @IsOptional()
  @IsString({ each: true })
  readonly status?: string[];

  @IsOptional()
  @IsString({ each: true })
  readonly progress?: string[];
}
