import { Module } from '@nestjs/common';

import { VocabularyController } from './vocabulary.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VocabularyController],
})
export class VocabularyModule {}
