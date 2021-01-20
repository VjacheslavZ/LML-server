import { Controller, UseGuards, Logger, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TranslationDto } from './dto/translation.dto';
import { TranslationService } from './translation.service';

@Controller('translation')
@UseGuards(AuthGuard())
export class TranslationController {
  private logger = new Logger('TranslationController');

  constructor(private translationService: TranslationService) {}

  @Post()
  getTranslation(@Body() { text }: TranslationDto) {
    this.logger.verbose(`Controller - getTranslation ${text}`);

    return this.translationService.getTranslation(text);
  }
}
