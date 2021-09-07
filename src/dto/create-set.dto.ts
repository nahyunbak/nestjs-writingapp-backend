import { IsString, IsNumber } from 'class-validator';

export class CreateSetDto {
  @IsString()
  readonly sort: string;

  @IsNumber()
  readonly level: number;

  @IsString()
  readonly user: string;

  @IsString()
  readonly ask: string;

  @IsString()
  readonly answer: string;
}
