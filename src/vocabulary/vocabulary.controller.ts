import { Controller, Logger, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { VocabularyDto } from './vocabulary.dto';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabulary')
@UseGuards(AuthGuard())
export class VocabularyController {
  private logger = new Logger('VocabularyController');

  constructor(private vocabularyService: VocabularyService) {}

  @Post('add')
  addToVocabulary(@Body() vocabularyDto: VocabularyDto, @GetUser() user: User) {
    this.logger.verbose('addTranslationToVocabulary');

    return this.vocabularyService.addToVocabulary(vocabularyDto, user);
  }
}
