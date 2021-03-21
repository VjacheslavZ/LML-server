import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TranslationModule } from './translation/translation.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule,
    TranslationModule,
    VocabularyModule,
    ProfileModule,
  ],
})
export class AppModule {}
