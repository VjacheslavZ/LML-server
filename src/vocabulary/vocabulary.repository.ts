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
    try {
      const translation = await TranslationEN.findOne(translation_id);

      const userVocabulary = new Vocabulary();
      userVocabulary.user = user;
      userVocabulary.isDone = false;
      userVocabulary.translation_en = translation;

      await userVocabulary.save();
      delete userVocabulary.user;

      return userVocabulary;
    } catch (error) {
      this.logger.error('Failed addToVocabulary', error.stak);
      throw new InternalServerErrorException();
    }
  }

  async getVocabulary(user: User): Promise<Vocabulary[]> {
    const query = this.createQueryBuilder('vocabulary').leftJoinAndSelect(
      'vocabulary.translation_en',
      'translation_en',
    );
    query.where('vocabulary.userId = :userId', { userId: user.id });

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed get vocabulary for user ${user.username}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
