import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Vocabulary } from './vocabulary.entity';
import { User } from '../auth/user.entity';
import { VocabularyDto } from './vocabulary.dto';

@EntityRepository(Vocabulary)
export class VocabularyRepository extends Repository<Vocabulary> {
  private logger = new Logger('VocabularyRepository');

  async addToVocabulary(
    { translation_id }: VocabularyDto,
    user: User,
  ): Promise<Vocabulary> {
    const query = this.createQueryBuilder('vocabulary');
    query.where('vocabulary.userId = :userId', { userId: user.id });

    const userVocabulary = await query.getOne();
    userVocabulary.translation_id.push(translation_id);

    try {
      await userVocabulary.save();
    } catch (error) {
      this.logger.error('Failed addToVocabulary', error.stak);
      throw new InternalServerErrorException();
    }
    return userVocabulary;
  }
}
