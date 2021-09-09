import { IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  readonly formId: string;

  @IsString()
  readonly level: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;
}
