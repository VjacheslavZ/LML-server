import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VocabularyController } from './vocabulary.controller';
import { AuthModule } from '../auth/auth.module';
import { VocabularyService } from './vocabulary.service';
import { VocabularyRepository } from './vocabulary.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VocabularyRepository]), AuthModule],
  controllers: [VocabularyController],
  providers: [VocabularyService],
})
export class VocabularyModule {}
