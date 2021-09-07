import { IsObject, IsString } from 'class-validator';

export class CreateSetDto {
  @IsString()
  readonly userId: string;

  @IsObject()
  readonly forms: { level: string; ask: string; answer: string };
}
