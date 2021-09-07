import { IsString, IsNumber } from 'class-validator';

export class CreateSetDto {
  @IsNumber()
  readonly level: string;

  @IsString()
  readonly ask: string;

  @IsString()
  readonly answer: string;
}
