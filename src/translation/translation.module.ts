import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';

import { AuthModule } from '../auth/auth.module';
import { TranslationService } from './translation.service';

@Module({
  imports: [AuthModule],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
