import { IsNotEmpty } from 'class-validator';

export class CreateTranslationDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  translation: string;
}
