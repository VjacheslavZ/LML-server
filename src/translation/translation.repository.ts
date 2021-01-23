import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { TranslationEN } from './translation.entity';
import { CreateTranslationDto } from './create-translation.dto';

@EntityRepository(TranslationEN)
export class TranslationRepository extends Repository<TranslationEN> {
  private logger = new Logger('TranslationRepository');

  async getTranslation(text: string): Promise<TranslationEN> {
    const query = this.createQueryBuilder('translation_en');
    query.where('translation_en.text = :text', { text });

    try {
      const translations = await query.getOne();
      this.logger.verbose(`TranslationRepository getOne ${translations}`);
      return translations;
    } catch (error) {
      this.logger.error(`Failing get Translation for "${text}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }

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
