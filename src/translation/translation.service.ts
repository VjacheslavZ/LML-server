import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Translate } = require('@google-cloud/translate').v2;
import * as config from 'config';

const apiConfig = config.get('keys');

@Injectable()
export class TranslationService {
  async getTranslation(text: string): Promise<string> {
    const translate = new Translate({
      key: apiConfig.translate_api_key,
    });
    const targetRussian = 'ru';

    try {
      let [translationsRussian] = await translate.translate(
        text,
        targetRussian,
      );

      translationsRussian = Array.isArray(translationsRussian)
        ? translationsRussian
        : [translationsRussian];

      translationsRussian.forEach((translation, i) => {
        console.log(`${text[i]} => (${targetRussian}) ${translation}`);
      });
    } catch (error) {
      console.log('err', error);
    }
    // Tod return translation
    return 'TranslationService - getTranslation';
  }
}
