import { Controller, Logger, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { VocabularyDto } from './vocabulary.dto';

@Controller('vocabulary')
@UseGuards(AuthGuard())
export class VocabularyController {
  private logger = new Logger('VocabularyController');

  @Post('add')
  addTranslationToDictionary(
    @Body() { translation_id }: VocabularyDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`Controller - addTranslationToVocabulary`);
    console.log('user', user);
    console.log('translation_id', translation_id);
  }
}
