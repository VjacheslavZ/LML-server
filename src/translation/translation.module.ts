import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationController } from './translation.controller';
import { AuthModule } from '../auth/auth.module';
import { TranslationService } from './translation.service';
import { TranslationRepository } from './translation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationRepository]), AuthModule],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
