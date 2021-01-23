import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Translate } = require('@google-cloud/translate').v2;
import * as config from 'config';

import { TranslationRepository } from './translation.repository';
import { TranslationEN } from './translation.entity';

const apiConfig = config.get('keys');

@Injectable()
export class TranslationService {
  constructor(
    @InjectRepository(TranslationRepository)
    private translationRepository: TranslationRepository,
  ) {}

  private logger = new Logger('TranslationController');

  async getTranslation(text: string): Promise<TranslationEN> {
    const translate = new Translate({
      key: apiConfig.translate_api_key,
    });
    const targetRussian = 'ru';
    const translation = await this.translationRepository.getTranslation(text);

    if (translation) {
      return translation;
    }

    try {
      const [translationsRussian] = await translate.translate(
        text,
        targetRussian,
      );

      return this.translationRepository.createTranslation({
        text,
        translation: translationsRussian,
      });
    } catch (error) {
      console.log('err', error);
    }
  }
}
