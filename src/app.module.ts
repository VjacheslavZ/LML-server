import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule,
    TranslationModule,
  ],
})
export class AppModule {}
