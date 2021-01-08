import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig)],
  // controllers: [AuthController],
  // providers: [AuthService],
})
export class AppModule {}
