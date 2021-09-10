import { IsString } from 'class-validator';

export class CreateSetDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly formId: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly answer: string;
}
