import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Vocabulary } from './vocabulary.entity';
import { VocabularyDto } from './vocabulary.dto';
import { VocabularyStatus } from './vocabulary-status.enum';
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

  async getVocabularyById(id: number, user: User): Promise<Vocabulary> {
    const found = this.vocabularyRepository.findOne({
      where: { id, user },
      relations: ['translation_en'],
    });

    if (!found) {
      throw new NotFoundException(`Vocabulary with id "${id}" not found`);
    }
    return found;
  }

  async updateVocabularyStatus(
    id: number,
    statusDto: VocabularyStatus,
    user: User,
  ): Promise<Vocabulary> {
    this.logger.log(`updateVocabulary ${id}`);

    const vocabulary = await this.getVocabularyById(id, user);
    vocabulary.status = statusDto;

    return await vocabulary.save();
  }
}
