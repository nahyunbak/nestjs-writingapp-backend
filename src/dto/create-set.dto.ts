import { IsString } from 'class-validator';

export class CreateSetDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly level: string;

  @IsString()
  readonly question: string;

  @IsString()
  readonly answer: string;
}
