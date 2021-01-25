import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { Vocabulary } from '../vocabulary/vocabulary.entity';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    try {
      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPasword(password, user.salt);
      await user.save();

      const vocabulary = await new Vocabulary();
      vocabulary.user = user;
      vocabulary.user_id = user.id;
      vocabulary.translation_id = [];
      await vocabulary.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User name already exists');
      } else {
        this.logger.verbose(`Error save user ${error}`);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPasword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
