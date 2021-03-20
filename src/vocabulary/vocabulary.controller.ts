import {
  Controller,
  Logger,
  UseGuards,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { VocabularyDto } from './vocabulary.dto';
import { VocabularyService } from './vocabulary.service';
import { VocabularyStatusValidationPipe } from './pipes/vocabulary-status-validation.pipe';
import { VocabularyStatus } from './vocabulary-status.enum';
import { Vocabulary } from './vocabulary.entity';

export interface IDelete {
  id: number;
  status: string;
}

@Controller('vocabulary')
@UseGuards(AuthGuard())
export class VocabularyController {
  private logger = new Logger('VocabularyController');

  constructor(private vocabularyService: VocabularyService) {}

  @Post('add')
  addToVocabulary(
    @Body() vocabularyDto: VocabularyDto,
    @GetUser() user: User,
  ): Promise<Vocabulary> {
    this.logger.verbose('addTranslationToVocabulary');
    return this.vocabularyService.addToVocabulary(vocabularyDto, user);
  }

  @Get()
  getVocabulary(@GetUser() user: User): Promise<Vocabulary[]> {
    this.logger.verbose('getVocabulary');
    return this.vocabularyService.getVocabulary(user);
  }

  @Patch('/:id/status')
  changeStatusDone(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', VocabularyStatusValidationPipe) status: VocabularyStatus,
    @GetUser() user: User,
  ): Promise<Vocabulary> {
    this.logger.verbose(`changeStatusDone ${id}`);
    return this.vocabularyService.updateVocabularyStatus(id, status, user);
  }

  @Delete('/:id')
  deleteVocabulary(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<IDelete> {
    return this.vocabularyService.deleteVocabulary(id, user);
  }
}
