import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ status: string }> {
    const { password, email } = authCredentialsDto;
    try {
      const user = new User();
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPasword(password, user.salt);
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists');
      } else {
        this.logger.verbose(`Error save user ${error}`);
        throw new InternalServerErrorException();
      }
    }

    return { status: 'registered' };
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
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
