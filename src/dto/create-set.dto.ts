import { IsString } from 'class-validator';

export class CreateSetDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly level: string;

  @IsString()
  readonly question: string;

  @IsString()
  readonly answer: string;
}
