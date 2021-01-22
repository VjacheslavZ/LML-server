import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { TranslationEN } from './translation.entity';
import { CreateTranslationDto } from './create-translation.dto';

@EntityRepository(TranslationEN)
export class TranslationRepository extends Repository<TranslationEN> {
  private logger = new Logger('TranslationRepository');

  async createTranslation(
    createTranslationDto: CreateTranslationDto,
  ): Promise<TranslationEN> {
    const { text, translation } = createTranslationDto;

    const translationEntity = new TranslationEN();
    translationEntity.text = text;
    translationEntity.translation = translation;

    try {
      await translationEntity.save();
    } catch (error) {
      this.logger.error('Failed createTranslation', error.stak);
      throw new InternalServerErrorException();
    }

    return translationEntity;
  }
}
