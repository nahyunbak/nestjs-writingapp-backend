import { IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  readonly level: string;

  @IsString()
  readonly title: string;
}
