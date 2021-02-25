import { Injectable, Logger } from '@nestjs/common';

import { Vocabulary } from './vocabulary.entity';
import { VocabularyDto } from './vocabulary.dto';
import { User } from '../auth/user.entity';
import { VocabularyRepository } from './vocabulary.repository';

@Injectable()
export class VocabularyService {
  private logger = new Logger('VocabularyService');

  constructor(private vocabularyRepository: VocabularyRepository) {}

  async addToVocabulary(
    vocabularyDto: VocabularyDto,
    user: User,
  ): Promise<Vocabulary> {
    this.logger.log('addToVocabulary');
    return await this.vocabularyRepository.addToVocabulary(vocabularyDto, user);
  }

  async getVocabulary(user: User): Promise<Vocabulary[]> {
    this.logger.log('getVocabulary');
    return await this.vocabularyRepository.getVocabulary(user);
  }
}
