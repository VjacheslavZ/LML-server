import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class VocabularyDto {
  @IsNotEmpty()
  translation_id: number;
}

export class VocabularyStatusDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  status: boolean;
}
