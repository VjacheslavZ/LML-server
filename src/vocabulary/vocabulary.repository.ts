import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Vocabulary } from './vocabulary.entity';
import { User } from '../auth/user.entity';
import { VocabularyDto } from './vocabulary.dto';
import { TranslationEN } from '../translation/translation.entity';
import { TranslationRepository } from '../translation/translation.repository';

@EntityRepository(Vocabulary)
export class VocabularyRepository extends Repository<Vocabulary> {
  private logger = new Logger('VocabularyRepository');

  constructor(
    @InjectRepository(TranslationRepository)
    private translationRepository: TranslationRepository,
  ) {
    super();
  }

  async addToVocabulary(
    { translation_id }: VocabularyDto,
    user: User,
  ): Promise<Vocabulary> {
    const translation = await TranslationEN.findOne(translation_id);

    const userVocabulary = new Vocabulary();
    userVocabulary.user = user;
    userVocabulary.isDone = false;
    userVocabulary.translation_en = translation;

    try {
      await userVocabulary.save();
    } catch (error) {
      this.logger.error('Failed addToVocabulary', error.stak);
      throw new InternalServerErrorException();
    }
    delete userVocabulary.user;

    return userVocabulary;
  }
}
