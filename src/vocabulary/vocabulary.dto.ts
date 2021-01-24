import { IsNotEmpty } from 'class-validator';

export class VocabularyDto {
  @IsNotEmpty()
  translation_id: number;
}
